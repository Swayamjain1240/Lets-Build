import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

import authRoute from "./routes/authRoute.js"

import connectDB from "./config/db.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());


app.use("/health", (req,res)=>{
    return res.status(201).json({message:"server is running"});
})


app.use("/api/auth", authRoute)

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
    connectDB();
})