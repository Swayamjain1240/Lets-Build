export const Signup = async (req,res) => {
    try {
        const {email, password, fullName} = req.body;
        if(!email || !password || !fullName){
            return res.status(401).json({message:"All Field Required"})
        }

        

    } catch (error) {
        console.error("error in Signup", error)
        return res.status(500).json({message:"internal server error"});
    }
}

export const Login = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("error in login", error)
        return res.status(500).json({message:"internal server error"});
    }
};



export const Logout = async (req,res) => {
    try {
        
    } catch (error) {
        console.error("error in Logout", error);
        return res.status(500).json({message: "internal server error"})
    }
}