// server/src/routes/userRoutes.js
import { Router } from 'express';
import {upload} from '../middleware/multerMiddleware.js';
import { getAllUsers, getUser, updateUser,setOnline, setOffline,getOnlineUsers }  from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get ('/online', authMiddleware, getOnlineUsers)
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.put('/update',  authMiddleware, upload.single('avatar'), updateUser);
//router.put('/', authMiddleware, updateUser);
router.put('/:id/online', authMiddleware, setOnline);
router.put('/:id/offline', authMiddleware, setOffline);

export default router;