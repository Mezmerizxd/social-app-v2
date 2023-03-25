import { Posts, PrismaClient } from '@prisma/client';
import { logManager } from '../helpers/logger';
import User from '../data/user';
import { createPostId } from '../helpers/generators';

class Globe {
  static readonly instance: Globe = new Globe();

  private prisma: PrismaClient;

  constructor() {
    if (Globe.instance) {
      throw new Error('Error: Instantiation failed: Use Globe.Instance instead of new.');
    }
  }

  async init(prisma: PrismaClient): Promise<void> {
    this.prisma = prisma;
    logManager('Globe initialized');
  }

  async getAllPostsFromDB(): Promise<Server.Managers.Globe.Post[] | null> {
    try {
      return await this.prisma.posts.findMany();
    } catch (err) {
      logManager('getAllPostsFromDB:', err);
      return null;
    }
  }

  async getAllPostsWithinDays(days: number): Promise<Server.Managers.Globe.Post[] | null> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - days);

      return await this.prisma.posts.findMany({
        where: {
          createdAt: {
            gte: date,
          },
        },
      });
    } catch (err) {
      logManager('getAllPostsWithinDays:', err);
      return null;
    }
  }

  async getPostById(postId: string): Promise<Server.Managers.Globe.Post | null> {
    try {
      return await this.prisma.posts.findUnique({
        where: {
          postId: postId,
        },
      });
    } catch (err) {
      logManager('getPostById:', err);
      return null;
    }
  }

  async getAllRepliesFromPost(
    replyTo: string,
  ): Promise<{ post: Server.Managers.Globe.Post; replies: Server.Managers.Globe.Post[] } | null> {
    try {
      const post = await this.prisma.posts.findUnique({
        where: {
          postId: replyTo,
        },
      });
      if (!post) {
        logManager('getAllRepliesFromPost: Post not found');
        return null;
      }

      const replies = await this.prisma.posts.findMany({
        where: {
          replyTo: replyTo,
        },
      });

      return { post, replies };
    } catch (err) {
      logManager('getAllRepliesFromPost:', err);
      return null;
    }
  }

  async getAllPostsFromUser(userId: string): Promise<Server.Managers.Globe.Post[] | null> {
    try {
      return await this.prisma.posts.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (err) {
      logManager('getAllPostsFromUser:', err);
      return null;
    }
  }

  async getAllSharedPostsFromUser(userId: string): Promise<Server.Managers.Globe.Post[] | null> {
    try {
      return await this.prisma.posts.findMany({
        where: {
          shares: {
            has: userId,
          },
        },
      });
    } catch (err) {
      logManager('GetAllSharedPostsFromUser:', err);
      return null;
    }
  }

  async createPost({ userId, content, replyTo }: Server.Managers.Globe.Post): Promise<void> {
    try {
      const user = new User(this.prisma, userId, 'id');
      const err = await user.init();
      if (!err.success) {
        logManager('createPost:', err);
        return;
      }

      const postId = await createPostId(this.prisma);
      if (!postId) {
        logManager('createPost: Failed to create postId');
        return;
      }

      const post: any = {
        postId: postId,
        avatar: user.profile.avatar,
        username: user.profile.username,
        userId: userId,
        content: content,
      };

      if (replyTo != null) {
        post.replyTo = replyTo;
      }

      await this.prisma.posts.create({
        data: post,
      });
    } catch (err) {
      logManager('createPost:', err);
    }
  }

  async loadFollowingPosts(userId: string): Promise<Server.Managers.Globe.Post[] | null> {
    try {
      const user = new User(this.prisma, userId, 'id');
      const err = await user.init();
      if (!err.success) {
        logManager('loadFollowingPosts:', err);
        return null;
      }

      const posts: Server.Managers.Globe.Post[] = [];

      for (let i = 0; i < user.profile.friends.length; i++) {
        this.getAllPostsFromUser(user.profile.friends[i]).then((postsFromUser) => {
          if (postsFromUser) {
            for (let i = 0; i < postsFromUser.length; i++) {
              const post = postsFromUser[i];
              posts.push({
                ...post,
              });
            }
          }
        });
        this.getAllSharedPostsFromUser(user.profile.friends[i]).then((postsFromUser) => {
          if (postsFromUser) {
            for (let i = 0; i < postsFromUser.length; i++) {
              const post = postsFromUser[i];
              posts.push({
                ...post,
                shared: true,
                sharedBy: user.profile.userId,
              });
            }
          }
        });
      }

      posts.filter((post, index, self) => {
        return self.findIndex((p) => p.postId === post.postId) === index;
      });

      posts.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      return posts;
    } catch (err) {
      logManager('loadFollowingPosts:', err);
      return null;
    }
  }
}

export default Globe.instance;
