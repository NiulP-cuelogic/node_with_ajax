import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.set('debug',true);

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String , required:true},
    firstname:{type:String , required:true},
    lastname:{type:String , required:true},
    password:{type:String , required:true},
    isAdmin:{type:Boolean , default:false}
})

export default mongoose.model("User",userSchema);