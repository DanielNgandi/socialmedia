import prisma from '../config/prisma.js';

export const likePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: req.userId,
        postId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    const like = await prisma.like.create({
      data: {
        userId: req.userId,
        postId,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const like = await prisma.like.findFirst({
      where: {
        userId: req.userId,
        postId,
      },
    });

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await prisma.like.delete({
      where: { id: like.id },
    });

    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    next(error);
  }
};
