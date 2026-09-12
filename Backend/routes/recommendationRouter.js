import express from "express";

import {
    getProjectRecommendations,
    getDeveloperRecommendations,
} from "../controllers/recommendationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Recommended open opportunities for current user
router.get(
    "/opportunities",
    getProjectRecommendations
);

// Recommended developers for owner's project
router.get(
    "/developers/:projectId",
    getDeveloperRecommendations
);

export default router;