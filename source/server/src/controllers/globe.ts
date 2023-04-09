import { PrismaClient } from '@prisma/client';
import { server } from '../managers/server';
import handler from '../helpers/handler';
import { logController } from '../helpers/logger';
import UserData from '../data/user';
import Globe from '../managers/globe';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/globe/following-posts', async (req, res) => {
    const { authorization } = req.headers;

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    const posts = await Globe.loadFollowingPosts(user.account.userId);
    if (!posts) {
      return {
        success: false,
        error: 'Posts not found',
      };
    }

    return {
      success: true,
      posts: posts,
    };
  });

  handler.POST(server.v1, '/globe/create-post', async (req, res) => {
    const { authorization } = req.headers;
    const { content } = req.body;

    if (!content) {
      return {
        success: false,
        error: 'Content is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    const post = await Globe.createPost(user.account.userId, content);

    return {
      success: true,
      post: post,
    };
  });

  handler.POST(server.v1, '/globe/like-post', async (req, res) => {
    const { authorization } = req.headers;
    const { postId } = req.body;

    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    await Globe.likePost(postId, user.account.userId);

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/share-post', async (req, res) => {
    const { authorization } = req.headers;
    const { postId } = req.body;

    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    await Globe.sharePost(user.account.userId, postId);

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/view-post', async (req, res) => {
    const { authorization } = req.headers;
    const { postId } = req.body;

    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    const post: any = await Globe.getAllRepliesFromPost(postId);
    if (!post) {
      return {
        success: false,
        error: 'Post not found',
      };
    }

    return {
      success: true,
      post: post,
      replies: post.replies,
    };
  });

  handler.POST(server.v1, '/globe/reply-to-post', async (req, res) => {
    const { authorization } = req.headers;
    const { postId, content } = req.body;

    if (!content) {
      return {
        success: false,
        error: 'Content is required',
      };
    }
    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    await Globe.createPost(user.account.userId, content, postId);

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/globe/delete-post', async (req, res) => {
    const { authorization } = req.headers;
    const { postId } = req.body;

    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required',
      };
    }

    const user: UserData = new UserData(prisma, authorization, 'token');
    const err = await user.init();
    if (err.error) return err;

    await Globe.deletePost(postId, user.account.userId);

    return {
      success: true,
    };
  });

  logController('Globe Loaded');
};
