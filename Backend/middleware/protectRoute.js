import jwt from "jsonwebtoken"

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            res.status(400).json({message:"Token not found"})
        }
        const verify = jwt.verify(token, JWT_TOKEN_API)
        if(!verify){
            res.status(400).json({message:"User were not verify"})
        }

        req = req.token
        next()
    } catch (error) {
        console.error("error in protect route", error)
        res.status(500).json({message:"internal server error"})
    }
}