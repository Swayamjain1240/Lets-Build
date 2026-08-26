import express from "express"
import {createRequest, respondToRequest, getMyRequests} from "../controllers/requestController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.post("/", createRequest);
router.get("/my-requests", getMyRequests);
router.put("/:id/respond", respondToRequest);

export default router;