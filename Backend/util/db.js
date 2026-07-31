import mongoose from "mongoose"

const connectDB = async (req,res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("data base connected")
    } catch (error) {
        console.error("error in connect db", error)
        res.status(500).josn({message:"internal server error"})
    }
}

export default connectDB