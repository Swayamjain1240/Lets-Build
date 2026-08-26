import express from "express"
import { createRecruitment, getRecruitments } from "../controllers/recruitmentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.get('/', getRecruitments);
router.post('/', createRecruitment);

export default router;