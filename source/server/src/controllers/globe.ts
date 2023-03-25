import { PrismaClient } from '@prisma/client';
import server from '../server';
import handler from '../helpers/handler';
import { logController } from '../helpers/logger';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/globe/following-posts', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
      posts: null,
    };
  });

  handler.POST(server.v1, '/globe/create-post', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/like-post', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/share-post', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/view-post', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
      post: null,
      replies: null,
    };
  });

  handler.POST(server.v1, '/globe/reply-to-post', async (req, res) => {
    const { authorization } = req.headers;

    return {
      success: true,
      posts: null,
    };
  });

  logController('Globe Loaded');
};
