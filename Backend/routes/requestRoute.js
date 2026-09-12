import express from "express";

import {
    createRequest,
    respondToRequest,
    getReceivedRequests,
    getSentRequests,
} from "../controllers/requestController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createRequest);

router.get(
    "/received",
    getReceivedRequests
);

router.get(
    "/sent",
    getSentRequests
);

router.put(
    "/:id/respond",
    respondToRequest
);

export default router;