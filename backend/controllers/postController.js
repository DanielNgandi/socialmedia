import { validationResult } from 'express-validator';
import prisma from '../config/prisma.js';
import { io } from '../server.js'; // ✅ If you're exporting io from server.js

export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { content, image } = req.body;

    const post = await prisma.post.create({
      data: {
        content,
        image: image || null,
        authorId: req.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        likes: {
          where: {
            userId: req.userId,
          },
          select: {
            userId: true,
          },
        },
      },
    });

        // ✅ Send real-time event to all connected clients
    io.emit('notifyNewPost', { postId: post.id, authorId: req.userId });

    // ✅ Fetch followers of the post author
    const followers = await prisma.follow.findMany({
      where: { followingId: req.userId },
      select: { followerId: true },
    });

    // ✅ Create a notification for each follower
    const notifications = followers.map((follower) =>
      prisma.notification.create({
        data: {
          type: 'new_post',
          userId: follower.followerId, // Recipient of the notification
          postId: post.id,
        },
      })
    );
    await Promise.all(notifications);

    const transformedPost = {
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
      likeCount: 0,
    };

    res.status(201).json(transformedPost);
  } catch (error) {
    next(error);
  }
};

export const getFeedPosts = async (req, res, next) => {
  try {
    //const following = await prisma.follow.findMany({
     // where: { followerId: req.userId },
     // select: { followingId: true },
   // });

   // const followingIds = following.map((f) => f.followingId);
    //followingIds.push(req.userId);

    const posts = await prisma.post.findMany({
     // where: { authorId: { in: followingIds } },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        likes: {
          where: {
            userId: req.userId,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts = posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
      likeCount: post._count.likes,
    }));

    res.json(transformedPosts);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id, 10);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
