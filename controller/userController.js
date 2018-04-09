import mongoose from "mongoose";
import User from "../models/user";

class userController{
    signup(req,res) {
        // console.log("working...");
    console.log("called...");
    var user = new User({
        _id:new mongoose.Types.ObjectId,
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    });

    if(req.body.email === "" || req.body.firstname ==="" || req.body.lastname ===""|| req.body.password ==="" ){
        res.json({message:"one or more fields is/are empty..."});
    }

    else{
        user.save().then(user1 => {
            if(req.body.email ==="admin@gmail.com" && req.body.password === "admin"){
                res.json({admin:user1});
            }
            else{
                res.json({user:user1});
            }
            // res.json({
            //     success: user1
            // })
            // localStorage.setItem('email',req.body.email);
            // console.log(user);
        });
    }
    }

    userDetails(req,res){
        var username = req.body.email;
        User.findOne({email:username}).exec().then(user=>{res.json({data:user})}).catch();
        console.log("username ==>",username);
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
        console.log('called...');
        User.findOne({email:req.body.email, password:req.body.password})
        .exec()
        .then(user1=>{
            if(req.body.email === "admin@gmail.com" && req.body.password === "admin"){
                console.log('called admin...');
                res.json({admin:user1});
            }

            else if(user.length<1){
                res.json({error:"not found.."});
            }
            else{
                res.json({user:user1});
            }
        })
        .catch(err=>{
            res.json({error:"Username or password is invalid .."});
        })
    }
}


export default new userController();    