import joi from "joi";


const bodySchema = {
        email:joi.string().email(),
        firstname:joi.string(),
        lastname:joi.string(),
        password:joi.string().alphanum().min(4).max(20),
        userid:joi.string().alphanum().min(24)
}

class Validation{

    validate(req,res,next){
        joi.validate(req.body,bodySchema,(err,result)=>{
            if(err){
                res.json({err:"validation failed.."})
            }
            else{
                console.log("validation done...");
                next();
            }
        })
    }

    checkObjectId(req,res,next){
        joi.validate(req.params.id,bodySchema.userid,(err,result)=>{
            if(err){
                res.json({err:"object id not found.."})
            }
            else{
                console.log("done..");
                next();
            }
        })
    }

}



export default new Validation();
 