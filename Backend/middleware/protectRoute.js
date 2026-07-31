import jwt from "jsonwebtoken"
import User from "../model/userModel.js"

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            res.status(400).json({message:"Token not found"})
        }
        const verify = jwt.verify(token, process.env.JWT_TOKEN_API)
        if(!verify){
            res.status(400).json({message:"User were not verify"})
        }
        const user = await User.findById(verify.userID).select("-password")
        if(!user){
            res.status(400).json({message:"Unauthorized access - user Not Found"})
        }
        req = req.user;
        next()
    } catch (error) {
        console.error("error in protect route", error)
        res.status(500).json({message:"internal server error"})
    }
}

export default protectRoute ;