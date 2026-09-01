import express from "express"
import {protect} from "../middleware/authMiddleware.js"

import {createReport} from "../controllers/reportController.js"

const router = express.Router()

router.use(protect)

router.post("/", createReport)


export default router;