import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {getOrCreateConversation, getUserConversations, sendMessage, getConversationMessages} from "../controllers/communicationController.js"

const router = express.Router()

router.use(protect)

router.post('/conversations', getOrCreateConversation);
router.get('/conversations', getUserConversations);
router.post('/messages', sendMessage);
router.get('/messages/:conversationId', getConversationMessages);

export default router;