import mongoose from "mongoose"
import jwt from "jsonwebtoken" 

const UserSchema = new mongoose.Schema({
 fullName:{
    type:String,
    required: true,
 },
 email:{
    type:String,
    required: true,
    unique: true
 },
 password:{
    type:String,
    required:true,
 }

},{timestamps:true})

const User = new mongoose.model("User", UserSchema);

export default User;

UserSchema.pre("save", (req,res)=>{
    try {
        
    } catch (error) {
        console.error("error in save salt", error)
        res.status(500).json({message:"internal server is error"})
    }
})