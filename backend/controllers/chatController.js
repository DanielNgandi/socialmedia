import prisma from '../config/prisma.js';

export const createConversation = async (req, res, next) => {
  const { senderId, receiverId } = req.body;
  try {
    // Check if conversation already exists
    const existing = await prisma.conversation.findFirst({
        where: {
        users: {
          every: {
            id: {
              in: [senderId, receiverId],
            },
          },
        },
      },
      include: {
        users: true,
      },
    });
    if (existing) return res.status(200).json(existing);

    const conversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            { id: senderId },
            { id: receiverId },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getUserConversations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: parseInt(userId),
          },
        },
      },
      include: {
        users: true,
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, senderId, text } = req.body;
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        text
      }
    });

    // Broadcast via socket.io
    req.io?.to(conversationId.toString()).emit("receiveMessage", message);

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const messages = await prisma.message.findMany({
      where: { conversationId: parseInt(conversationId) },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
