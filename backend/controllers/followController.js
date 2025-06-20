import prisma from '../config/prisma.js';

export const followUser = async (req, res, next) => {
  try {
    const followingId = parseInt(req.params.userId, 10);

    if (followingId === req.userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const user = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: req.userId,
        followingId,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: req.userId,
        followingId,
      },
    });

    res.status(201).json(follow);
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    const followingId = parseInt(req.params.userId, 10);

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: req.userId,
        followingId,
      },
    });

    if (!follow) {
      return res.status(404).json({ error: 'Follow relationship not found' });
    }

    await prisma.follow.delete({
      where: { id: follow.id },
    });

    res.json({ message: 'Unfollowed successfully' });
  } catch (error) {
    next(error);
  }
};
