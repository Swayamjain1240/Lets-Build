import express from "express"
import {
    createProject,
    getMyProjects,
    getProjectDetails,
    updateProject,
    deleteProject,
    removeProjectMember,
} from "../controllers/projectController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.post("/", createProject);
router.get("/", getMyProjects);
router.get("/:id", getProjectDetails);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.delete(
    "/:id/team/:memberId",
    removeProjectMember
);

export default router;