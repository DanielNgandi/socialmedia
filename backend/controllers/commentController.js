import prisma from '../config/prisma.js';

export const getComments = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};
