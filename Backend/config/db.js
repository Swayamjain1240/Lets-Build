import mongoose from "mongoose";

export const ConnectDb = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected ..")
    } catch (error) {
        console.error("error in connecting database ")
        process.exit(1);
    }
}