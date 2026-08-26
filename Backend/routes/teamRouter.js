import express from "express";

import { getTeam, removeMember } from "../controllers/teamController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.get("/:projectId", getTeam);
router.delete("/:projectId/members/:userId", removeMember);

export default router;