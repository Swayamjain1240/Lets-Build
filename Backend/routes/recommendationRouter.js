import express from "express";
import { getProjectRecommendations, getDeveloperRecommendations } from "../controllers/recommendationController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect);

router.get("/projects", getProjectRecommendations);
router.get("/developers/:projectId", getDeveloperRecommendations);

export default router;