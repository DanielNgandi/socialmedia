import express from 'express';
import { createConversation, getUserConversations, sendMessage, getMessages } from '../controllers/chatController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Conversations
router.post('/conversations', authMiddleware, createConversation);
router.get('/conversations/:userId', authMiddleware, getUserConversations);

// Messages
router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:conversationId', authMiddleware, getMessages);

export default router;
