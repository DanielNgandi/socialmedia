// server/src/routes/userRoutes.js
import { Router } from 'express';
import { getAllUsers, getUser, updateUser }  from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.put('/', authMiddleware, updateUser);

export default router;