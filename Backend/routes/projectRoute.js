import express from "express"
import  {createProject, getMyProjects, updateProject} from "../controllers/projectController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.post("/", createProject);
router.get("/my-project", getMyProjects);
router.get("/:id", getProjectDetails);
router.options("/:id", updateProject);