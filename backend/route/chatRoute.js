import express from 'express';
import { createConversation, getUserConversations, sendMessage, getMessages,markMessageNotificationsRead,getMessageNotifications } from '../controllers/chatController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Conversations
router.post('/conversations', authMiddleware, createConversation);
router.get('/conversations/:userId', authMiddleware, getUserConversations);

// Messages
router.post('/messages', authMiddleware, sendMessage);
router.get('/messages/:conversationId', authMiddleware, getMessages);
router.get('/notifications/messages', authMiddleware, getMessageNotifications);
router.put('/notifications/messages/mark-read', authMiddleware, markMessageNotificationsRead);
export default router;
