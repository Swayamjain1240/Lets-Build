import express from "express"
import dotenv from "dotenv"
import connectDB from "./util/db.js"
import dns from "dns"
import Rate from "./middleware/rateLimit.js"
import cookieParser from "cookie-parser"
dotenv.config()
dns.setServers(["1.1.1.1", "8.8.8.8"])


import adminRoute from "./router/adminRoute.js"
import authRoute from "./router/authRoute.js"
import userRoute from "./router/userRoute.js"


const app = express()

const PORT = process.env.PORT || 3000

app.get("/health",(req,res)=>{
    console.log("successfull run health")
});

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.use(Rate);


app.listen(3000, ()=>{
    console.log("server is running...")
    connectDB()
})