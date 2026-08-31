import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected ..")
    } catch (error) {
        console.error("error in connecting database ")
        process.exit(1);
    }
}

export default connectDb;