import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    getOrCreateConversation,
    getUserConversations,
    sendMessage,
    getConversationMessages,
} from "../controllers/communicationController.js";

const router = express.Router();

router.use(protect);

router.post(
    "/conversations",
    getOrCreateConversation
);

router.get(
    "/conversations",
    getUserConversations
);

router.get(
    "/conversations/:conversationId/messages",
    getConversationMessages
);

router.post(
    "/conversations/:conversationId/messages",
    sendMessage
);

export default router;