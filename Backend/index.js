import express from "express"
import dotenv from "dotenv"
dotenv.config()

import dns from "dns"
import cookieParser from "cookie-parser"
dns.setServers(["1.1.1.1", "8.8.8.8"])


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())


app.listen(3000, ()=>{
    console.log("server is running...")
})