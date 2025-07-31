import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io'; 
import authRoutes from './route/authRoute.js';
import userRoutes from './route/userRoute.js';
import postRoutes from './route/postRoute.js';
import chatRoutes from './route/chatRoute.js';
import followRoutes from './route/followRoute.js';
import errorHandler from './middleware/errorHandle.js';

const prisma = new PrismaClient();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

 
   socket.on("joinUserRoom", (userId) => {
    socket.join(userId.toString());
    console.log(`👤 User ${userId} joined personal room`);
  });

   // Optional: Join room for private conversation
 socket.on("joinRoom", (conversationId) => {
 socket.join(conversationId.toString());
  console.log(`🔁 User joined room ${conversationId}`);
  });

  socket.on("newPost", (data) => {
    console.log("📢 Broadcasting new post");
    socket.broadcast.emit("notifyNewPost", data); // send to all others
  });

   // New message notification
  socket.on("sendMessageNotification", ({ receiverId }) => {
    io.to(receiverId.toString()).emit("newMessageNotification");
    console.log(`📩 Sent message notification to user ${receiverId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

export { io };


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});

export default app;
