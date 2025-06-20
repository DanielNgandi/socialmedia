import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import validateRequest from '../middleware/validateRequest.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    validateRequest
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
  ],
  authController.login
);

router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

export default router;
