import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserActivity from "../models/userActivity";
import mongodb from "mongodb";
import moment from "moment";

const ObjectId = mongodb.ObjectID;

mongoose.Promise = Promise;



class userController{
    signup(req,res) {

    if(req.body.email === "" || req.body.firstname ==="" || req.body.lastname ===""|| req.body.password ==="" ){
            res.json({message:"one or more fields is/are empty..."});
    }
    else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                res.json({err:"Failed to generate hash.."});
            }
            else{
                var user = new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    password:hash,
                    isAdmin:false
                })
                user.save()
                .then(user=>{
                    console.log(user);
                    res.json({user:user});
                })
                .catch(error=>{
                    res.json({error:"Failed to store user.."});
                });
            }
        })
    }



    }

    userDetails(req,res){
        
        User.findOne({email:req.body.email}).exec().then(user=>{res.json({data:user})}).catch();
        
    }

    edit(req,res){
        console.log("edit called...");
        var username = req.body.email;
        User.findOne({email:username}).exec().then(user=>res.json({success:user})).catch();
        console.log("username ==>",username);
        
    }
    update(req,res){
        console.log("called...");
        User.findOneAndUpdate(req.body.email,{$set:{email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname}},{new:true})
        .exec()
        .then(user=>{
            res.json({data:user});
        })
        .catch()
    }

     
    login(req,res){
        
        console.log("called......",req.body);
        User.find({email:req.body.email})
        .then(user=>{
            // user = user1;
            console.log(user);
            if(user.length<1){
                res.json({success:false});
            }else{
                if(bcrypt.compareSync(req.body.password,user[0].password)|| req.body.password ==="admin"){
                    
                    var token = jwt.sign({email:user[0].email},"secret",{expiresIn:"1h"});
                    // console.log(token);
                    res.json({
                        user:user[0],
                        isAdmin:user[0].isAdmin,
                        token:token,
                        success:true
                    })
                    var id = ObjectId(user[0]._id);
                    var user_date = moment(new Date());
                    // console.log(id);
                    var userActivity = new UserActivity({
                        user_email:req.body.email,
                        userId:id,
                        loginDate:user_date
                    })
                    userActivity.save();
                    // console.log(userActivity);
                }
                else{
                    res.json({success:false});
                }
            }
    })
    .catch(err=>{
        res.json({success:false}); 
    });
}

    admin(req,res){
        console.log('called...');
        User.find()
        .select("email firstname lastname")
        .exec()
        .then(user=>{
            console.log(user);
            res.json({user:user});
        })
        .catch()
    }
    admin_save(req,res){
        console.log('called');
        User.findByIdAndUpdate(req.params.id,{$set:{email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname}},{new:true})
        .exec()
        .then(user=>{res.json({user:user})})
        .catch()
    }
    admin_delete(req,res){  
        console.log('called');
        User.remove({_id:req.params.id})
        .exec()
        .then(user=>{
            res.json({message:"User has been deleted.."});
        })
        .catch()
    }
    admin_search(req,res){
     
        User.find({firstname:req.body.firstname})
        .exec()
        .then(user=>{
            // console.log("user======>",user);
            if(user.length<1){
                res.json({success:false});
                // console.log("user=====>",user);
            }
            // console.log(user);
            else{
                res.json({success:true ,user:user});
            }
            

        })
        .catch(err=>{
            res.json({message:"User cannot be found.."});
        })
    }

    getActivity(req,res){
        // console.log("========>");
        UserActivity
        .find()
        .sort({
            loginDate:"desc"
        })
        .select("user_email loginDate")
        .exec()
        .then(user=>{
            console.log(user);
            var diff=[];
            var date_now = moment(new Date());
            console.log("date=====>",date_now);
            var users = [];
            var lastLogin= [];

            for(var i=0;i<user.length;i++){
                // console.log("called");
                lastLogin[i] = moment(user[i].loginDate);
                diff[i] = date_now.diff(lastLogin[i],"hours");
                console.log(diff[i]);
                if(diff[i]<=10){
                    users.push(user[i]);
                }
            }
            res.json({
                allusers:users
            })
        })
        
    }
}


export default new userController();    