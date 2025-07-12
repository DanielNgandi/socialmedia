import prisma from '../config/prisma.js';

export const getAllUsers = async (req, res, next) => {
  try {
     const users = await prisma.user.findMany({
      where: {
        NOT: { id: req.userId },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            followers: true, // Get follower count
          },
        },
        followers: {
          select: {
            followerId: true,
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId =  req.userId;
    //const userId = parseInt(req.params.id) || req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.userId) {
      const isFollowing = await prisma.follow.findFirst({
        where: {
          followerId: req.userId,
          followingId: userId,
        },
      });
      user.isFollowing = !!isFollowing;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, bio, avatar } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        bio,
        avatar,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id/online
export const setOnline = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.update({
      where: { id: userId },
      data: { isOnline: true },
    });
    res.status(200).json({ message: "User is online" });
  } catch (error) {
    res.status(500).json({ error: "Failed to set online status" });
  }
};

// PUT /api/users/:id/offline
export const setOffline = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.update({
      where: { id: userId },
      data: { isOnline: false },
    });
    res.status(200).json({ message: "User is offline" });
  } catch (error) {
    res.status(500).json({ error: "Failed to set offline status" });
  }
};

// GET /api/users/online
export const getOnlineUsers = async (req, res) => {
  try {
    console.log("✅ getOnlineUsers route hit");
    const users = await prisma.user.findMany({
      where: {
        isOnline: true,
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    return res.status(200).json(users); // ✅ Return array
  } catch (error) {
    console.error("Error fetching online users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
