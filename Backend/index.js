import express from "express"
import dotenv from "dotenv"

import RateLimit from "./middleware/rateLimit.js"


import adminRoute from "./router/adminRoute.js"
import authRoute from "./router/authRoute.js"
import userRoute from "./router/userRoute.js"

import connectDB from "./util/db.js"
import dns from "dns"
import cookieParser from "cookie-parser"
dotenv.config()
dns.setServers(["1.1.1.1", "8.8.8.8"])


const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.use(RateLimit);

app.listen(3000, ()=>{
    console.log("server is running...")
    connectDB()
})