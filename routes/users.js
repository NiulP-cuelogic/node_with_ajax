import express from "express";
import user from "../controller/userController";
import app from "../app";
import User from "../models/user";

const router = express.Router();

// user.signup();

router.post("/",user.signup);
    // console.log("called...");
    // var user = new User({
    //     email:req.body.email,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname,
    //     password:req.body.password
    // });

    // if(req.body.email === "" || req.body.firstname ==="" || req.body.lastname ===""|| req.body.password ==="" ){
    //     res.json({message:"one or more fields is(are) empty..."});
    // }

    // else{
    //     user.save().then(user1 => {
        
    //         res.json({
    //             message: user1
    //         })
    //         // console.log(user);
    //     });
    // }
router.post("/userDetails",user.userDetails);
router.post("/userDetails/edit",user.edit);
router.post('/userDetails/update',user.update);
router.post('/signin',user.login);
export default router;