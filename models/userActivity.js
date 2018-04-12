import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.set('debug',true);
    
var userActivitySchema = new Schema({

    user_email:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    loginDate:{type:Date , default:Date.now}

});

export default mongoose.model("UserActivity",userActivitySchema);