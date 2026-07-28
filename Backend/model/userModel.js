import mongoose from "mongoose"
import jwt from "jsonwebtoken" 
import bcrypt from "bcrypt"

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
 },


},{timestamps:true})


UserSchema.pre("save", async()=>{
   if(!this.isModified("password")) return;
   try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      
   } catch (error) {
      console.error("error in save salt", error)
      res.status(500).json({message:"internal server is error"})
   }
})

userSchema.method.matchPassword = async function (enterPassword) {
    const isPassCorrect = await bcrypt.compare(enterPassword, this.password);
    return isPassCorrect;
}

const User = new mongoose.model("User", UserSchema);
export default User;