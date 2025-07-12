// POST /api/posts/:postId/like
import prisma from '../config/prisma.js';

export const toggleLike = async (req, res, next) => {
  console.log("🧪 Like request - userId:", req.userId, "postId:", req.params.postId);

  try {
    const postId = parseInt(req.params.postId);
    const userId = req.userId;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      // If liked before, remove the like
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      // Return updated like count and status
      const likeCount = await prisma.like.count({ where: { postId } });

      return res.status(200).json({
        liked: false,
        likeCount,
        message: 'Post unliked',
      });
    } else {
      // If not liked yet, add the like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      const likeCount = await prisma.like.count({ where: { postId } });

      return res.status(201).json({
        liked: true,
        likeCount,
        message: 'Post liked',
      });
    }
  } catch (error) {
    console.error("Like toggle error:", error);
    next(error);
  }
};


