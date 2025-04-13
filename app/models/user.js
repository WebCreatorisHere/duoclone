import mongoose from "mongoose";
const {Schema, model} = mongoose

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    isVerified:{type:Boolean,required:true},
    password:{type:String},
    age:{type:Number},
})

export default mongoose.models.User || model("User",userSchema)