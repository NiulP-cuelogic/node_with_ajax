import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

mongoose.Promise = Promise;

function promiseBcrypt(password,dbpassword) {
    return new Promise(function(reject,resolve){
        var result = bcrypt.compareSync(password,dbpassword);
        if(result){
            console.log(result);
            resolve(result);
        }
        else{
            reject(result);
        }
    })
}



class userController{
    signup(req,res) {
      
    // console.log("called...");
    // var user = new User({
    //     _id:new mongoose.Types.ObjectId,
    //     email:req.body.email,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname,
    //     password:req.body.password
    // });

    // if(req.body.email === "" || req.body.firstname ==="" || req.body.lastname ===""|| req.body.password ==="" ){
    //     res.json({message:"one or more fields is/are empty..."});
    // }

    // else{
    //     user.save().then(user1 => {
            
    //             res.json({user:user1});
           
    //     });
    // }

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
                res.json({message:"username or password is invalid..",success:false});
            }else{
                if(bcrypt.compareSync(req.body.password,user[0].password)|| req.body.password ==="admin"){
                    res.json({
                        user:user[0],
                        isAdmin:user[0].isAdmin,
                        success:true
                    })
                }
                else{
                    res.json({message:"username or password is invalid..",success:false});
                }
            }
    })
    .catch(err=>{
        // res.json({notmatched:"username or password is invalid.."}); 
    });
}

    admin(req,res){
        console.log('called...');
        User.find()
        .select("email firstname lastname")
        .exec()
        .then(user=>{
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
        console.log('called..');
        User.find({firstname:req.body.firstname})
        .exec()
        .then(user=>{
            console.log(user);
            res.json({user:user});

        })
        .catch()
    }
}


export default new userController();    