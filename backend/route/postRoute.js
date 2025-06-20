import { Router } from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/postController.js';
import * as likeController from '../controllers/likeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = Router();

router.post(
  '/',
  [
    authMiddleware,
    body('content').trim().notEmpty().withMessage('Content is required'),
    validateRequest
  ],
  postController.createPost
);

router.get('/', authMiddleware, postController.getFeedPosts);
router.delete('/:id', authMiddleware, postController.deletePost);

// Like routes
router.post('/:postId/like', authMiddleware, likeController.likePost);
router.delete('/:postId/like', authMiddleware, likeController.unlikePost);

export default router;
