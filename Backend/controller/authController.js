export const Login = async (req,res) => {
    try {
        const {email, password} = req.body
        
        if(!email || !password){
            return res.status(400).json({message:"All Field Required"})
        }

        
        
    } catch (error) {
        
    }
}