import express from "express"

const router = express.Router()

router.post("/login", Login)
router.post("/logout", Logout)
router.post("/signup", Signup)


export default router ;