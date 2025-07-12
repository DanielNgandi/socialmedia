import { Router } from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/postController.js';
//import {toggleLike} from '../controllers/likeController.js';
import { toggleLike } from '../controllers/likeController.js'; // ✅ FIXED: direct import
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import * as commentController from '../controllers/commentController.js';

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
// Comments
router.get('/:postId/comments', authMiddleware, commentController.getComments);
router.post(
  '/:postId/comments',
  [
    authMiddleware,
    body('content').trim().notEmpty().withMessage('Comment cannot be empty'),
    validateRequest
  ],
  commentController.createComment
);


router.get('/', authMiddleware, postController.getFeedPosts);
router.delete('/:id', authMiddleware, postController.deletePost);

// Like routes
router.post('/:postId/like', authMiddleware, toggleLike);
router.delete('/:postId/like', authMiddleware, toggleLike);

//router.post('/:postId/like', authMiddleware, likeController.toggleLike);
//router.delete('/:postId/like', authMiddleware, likeController.toggleLike);

export default router;
