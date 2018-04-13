import jwt from "jsonwebtoken";
import boom from "boom";

class authController{
    checkToken(req,res,next){
        var token = req.body.token;
        // console.log("token===>",token);
        // var decoded = jwt.verify(token,"secret");
        if(!token){
            
            // res.write({message:"No token provided..",success:false})
            res.json({success:false});
            
        }
        jwt.verify(token,"secret",(err,result)=>{
            if(err){
                res.json({message:"No token provided..",success:false})
            }
            else{
                // res.status(200).send(decoded);
                next();
            }
        })
        // req.user = decoded;
        // next();
    }
}
 

export default new authController();