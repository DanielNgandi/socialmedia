import { Router } from 'express';
import {followUser,unfollowUser} from '../controllers/followController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:userId', authMiddleware, followUser);
router.delete('/:userId', authMiddleware, unfollowUser);

export default router;
