import express from "express"
import {Login} from "../controller/authController.js"

const router = express.Router()

router.post("/login", Login)
router.post("/logout", Logout)
router.post("/signup", Signup)
router.post("/onboard", onBoard)


export default router ;