import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import dns from "dns"
import cors from "cors"
dns.setServers(["1.1.1.1", "8.8.8.8"])

import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import projectRoute from "./routes/projectRoute.js"
import recruitmentRoute from "./routes/recruitmentRoute.js"
import teamRouter from "./routes/teamRouter.js"
import requestRouter from "./routes/requestRoute.js"
import recommendationRouter from "./routes/recommendationRouter.js"
import connectDB from "./config/db.js"
import { initSocket } from "./sockets/socket.js"
import notificationRoutes from "./routes/notificationRoute.js"
import reportRoutes from "./routes/reportRoute.js"
import communicationRoutes from "./routes/communicationRoute.js"


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

app.use((err, req, res, next) => {
  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
});


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/recruitments", recruitmentRoute);
app.use("/api/request", requestRouter)
app.use("/api/team", teamRouter)
app.use("/api/recommendations", recommendationRouter);
app.use('/api/notifications', notificationRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/reports', reportRoutes);

const server = app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
    connectDB();
});

initSocket(server)