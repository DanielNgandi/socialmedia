import { Router } from 'express';
import {followUser,getFollowing, unfollowUser,isFollowing,getUserFriends} from '../controllers/followController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:userId', authMiddleware, followUser);
router.get('/following/:userId', authMiddleware, getFollowing);
router.get('/is-following/:userId', authMiddleware, isFollowing);
router.delete('/:userId', authMiddleware, unfollowUser);
router.get('/friends/:userId', authMiddleware, getUserFriends); // 🔥 Get following list (used as "friends")

export default router;
