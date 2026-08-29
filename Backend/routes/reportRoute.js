import express from "express"
import {protect, authorize} from "../middleware/authMiddleware.js"

import {createReport, getAllReports, updateReportStatus} from "../controllers/reportController.js"

const router = express.Router()

router.use(protect)

router.post("/", createReport)
router.get('/', getAllReports);
router.patch('/:id/status', updateReportStatus);

export default router;