import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import prisma from '../config/prisma.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, name } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: name || username,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   console.log("❌ Validation errors:", errors.array());
   return res.status(400).json({ errors: errors.array() });
 }

  try {
    const { email, password } = req.body;
     console.log("📥 Login attempt:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       console.log("❌ Incorrect password for:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
     console.log("✅ Login successful for:", email);
    res.json({
      status: 'success',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      if (!newPassword || typeof newPassword !== 'string') {
        return res.status(400).json({ error: 'Invalid request' });
      }
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'No account found with that email' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

export const logout = (req, res) => {
  res.json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

export const getMe = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'User ID not provided' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
        select: {
        id: true,
        username: true,
        name: true,
        email: true,
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

    res.json(user);
  } catch (error) {
    console.error('GetMe error:', error);
    next(error);
  }
};
