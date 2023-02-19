import { socket } from '../server';
import { PrismaClient, Accounts as PrismaAccount, Profiles as PrismaProfile } from '@prisma/client';
import { AccountSettings } from '../config';

export default class Profile {
  prisma: PrismaClient;
  key: string;
  method: string;
  account: PrismaAccount;
  profile: PrismaProfile;
  friends: Server.Managers.Profile.BasicProfileData[];
  requestsReceived: Server.Managers.Profile.BasicProfileData[];
  requestsSent: Server.Managers.Profile.BasicProfileData[];

  constructor(prisma: PrismaClient, key: string | undefined, method: 'token' | 'id') {
    this.prisma = prisma;
    if (!key) throw new Error('Profile manager: missing key');
    this.key = key;
    this.method = method;
  }

  async init(): Promise<{ success: boolean; error?: string }> {
    // Check if the key and method are valid
    if (!this.prisma) {
      return { success: false, error: 'Something went wrong.' };
    }
    if (!this.key) {
      return { success: false, error: 'Something went wrong.' };
    }
    if (!this.method) {
      return { success: false, error: 'Something went wrong.' };
    }
    // Get the account
    if (this.method === 'token') {
      const account = await this.prisma.accounts.findFirst({
        where: {
          authorization: this.key,
        },
      });
      if (!account) {
        return { success: false, error: 'Invalid token' };
      }
      this.account = account;
    } else if (this.method === 'id') {
      const account = await this.prisma.accounts.findFirst({
        where: {
          userId: this.key,
        },
      });
      if (!account) {
        return { success: false, error: 'Invalid Id' };
      }
      this.account = account;
    } else {
      return { success: false, error: 'Invalid method' };
    }
    // Get the profile
    const profile = await this.prisma.profiles.findFirst({
      where: {
        userId: this.account.userId,
      },
    });
    if (!profile) {
      return { success: false, error: 'Profile does not exist' };
    }
    this.profile = profile;
    // Get and sort the friends
    if (this.profile.friends.length > 0) {
      let friends: Server.Managers.Profile.BasicProfileData[] = [];
      for (let i = 0; i < this.profile.friends.length; i++) {
        const account = await this.prisma.profiles.findFirst({
          where: {
            userId: this.profile.friends[i],
          },
        });
        if (account) {
          friends.push({
            userId: account.userId,
            username: account.username,
            avatar: account.avatar,
          });
        }
      }
      this.friends = friends;
    }
    // Get and sort friend requests received
    if (this.profile.friendRequestsReceived.length > 0) {
      let requestsReceived: Server.Managers.Profile.BasicProfileData[] = [];
      for (let i = 0; i < this.profile.friendRequestsReceived.length; i++) {
        const account = await this.prisma.profiles.findFirst({
          where: {
            userId: this.profile.friendRequestsReceived[i],
          },
        });
        if (account) {
          requestsReceived.push({
            userId: account.userId,
            username: account.username,
            avatar: account.avatar,
          });
        }
      }
      this.requestsReceived = requestsReceived;
    }
    // Get and sort friend requests sent
    if (this.profile.friendRequestsSent.length > 0) {
      let requestsSent: Server.Managers.Profile.BasicProfileData[] = [];
      for (let i = 0; i < this.profile.friendRequestsSent.length; i++) {
        const account = await this.prisma.profiles.findFirst({
          where: {
            userId: this.profile.friendRequestsSent[i],
          },
        });
        if (account) {
          requestsSent.push({
            userId: account.userId,
            username: account.username,
            avatar: account.avatar,
          });
        }
      }
      this.requestsSent = requestsSent;
    }
    return { success: true };
  }

  async handleFriend(
    userId: string,
    action: 'accept' | 'decline' | 'send' | 'remove',
  ): Promise<{ success: boolean; error?: string }> {
    // Check if the key and method are valid
    if (!userId) {
      return { success: false, error: 'Missing userId' };
    }
    if (!action) {
      return { success: false, error: 'Missing action' };
    }
    // Get the user
    const user = await this.getUserById(userId);
    if (!user) {
      return { success: false, error: 'Invalid userId' };
    }

    // Handle the action
    switch (action) {
      case 'accept':
        // Check if the user has sent a friend request
        if (!this.profile.friendRequestsReceived.includes(user.account.userId)) {
          return { success: false, error: 'User has not sent a friend request' };
        }
        // Add the user to the friends list
        await this.prisma.profiles.update({
          where: {
            userId: this.account.userId,
          },
          data: {
            friends: {
              push: user.account.userId,
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.account.userId,
          },
          data: {
            friends: {
              push: this.account.userId,
            },
          },
        });
        // Remove the user from the friend requests received list
        await this.prisma.profiles.update({
          where: {
            userId: this.account.userId,
          },
          data: {
            friendRequestsReceived: {
              set: this.profile.friendRequestsReceived.filter((id) => id !== user.account.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: this.account.userId,
          },
          data: {
            friendRequestsReceived: {
              set: this.profile.friendRequestsSent.filter((id) => id !== user.account.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.account.userId,
          },
          data: {
            friendRequestsSent: {
              set: user.profile.friendRequestsReceived.filter((id) => id !== this.account.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.account.userId,
          },
          data: {
            friendRequestsSent: {
              set: user.profile.friendRequestsSent.filter((id) => id !== this.account.userId),
            },
          },
        });

        // emit to socket updateFriends
        socket.to(user.account.userId).emit('updateFriends', {
          userId: this.account.userId,
          username: this.profile.username,
          avatar: this.profile.avatar,
        });
        socket.to(this.account.userId).emit('updateFriends', {
          userId: user.account.userId,
          username: user.profile.username,
          avatar: user.profile.avatar,
        });
        break;
      case 'decline':
        await this.prisma.profiles.update({
          where: {
            userId: this.profile.userId,
          },
          data: {
            friendRequestsReceived: {
              set: this.profile.friendRequestsReceived.filter((id) => id !== user.profile.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: this.profile.userId,
          },
          data: {
            friendRequestsSent: {
              set: this.profile.friendRequestsSent.filter((id) => id !== user.profile.userId),
            },
          },
        });

        await this.prisma.profiles.update({
          where: {
            userId: user.profile.userId,
          },
          data: {
            friendRequestsReceived: {
              set: user.profile.friendRequestsReceived.filter((id) => id !== this.profile.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.profile.userId,
          },
          data: {
            friendRequestsSent: {
              set: user.profile.friendRequestsSent.filter((id) => id !== this.profile.userId),
            },
          },
        });

        break;
      case 'send':
        // Check if the user is already friends
        if (this.profile.friends.includes(user.account.userId)) {
          return { success: false, error: 'User is already friends' };
        }
        // Check if the user has already sent a friend request
        if (this.profile.friendRequestsSent.includes(user.account.userId)) {
          return { success: false, error: 'User has already sent a friend request' };
        }
        // Check if the user has already received a friend request
        if (this.profile.friendRequestsReceived.includes(user.account.userId)) {
          return { success: false, error: 'User has already received a friend request' };
        }
        // Add the user to the friend requests sent list

        await this.prisma.profiles.update({
          where: {
            userId: this.account.userId,
          },
          data: {
            friendRequestsSent: {
              push: user.account.userId,
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.account.userId,
          },
          data: {
            friendRequestsReceived: {
              push: this.account.userId,
            },
          },
        });
        break;
      case 'remove':
        // Check if the user is friends
        if (!this.profile.friends.includes(user.account.userId)) {
          return { success: false, error: 'User is not friends' };
        }
        // Remove the user from the friends list
        await this.prisma.profiles.update({
          where: {
            userId: this.account.userId,
          },
          data: {
            friends: {
              set: this.profile.friends.filter((id) => id !== user.account.userId),
            },
          },
        });
        await this.prisma.profiles.update({
          where: {
            userId: user.account.userId,
          },
          data: {
            friends: {
              set: user.profile.friends.filter((id) => id !== this.account.userId),
            },
          },
        });
        break;
    }

    return { success: true };
  }

  async changeUsername(username: string): Promise<{ success: boolean; error?: string }> {
    if (username.length > AccountSettings.maxUsernameLength) {
      return { success: false, error: 'Username is too long' };
    }
    if (username.length < AccountSettings.minUsernameLength) {
      return { success: false, error: 'Username is too short' };
    }
    // Check if the username is already taken
    const user = await this.prisma.profiles.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      return { success: false, error: 'Username is already taken' };
    }
    // Update the username
    await this.prisma.profiles.update({
      where: {
        userId: this.account.userId,
      },
      data: {
        username,
      },
    });
    return { success: true };
  }

  async changeAvatar(avatar: string): Promise<{ success: boolean; error?: string }> {
    // Update the avatar
    await this.prisma.profiles.update({
      where: {
        userId: this.account.userId,
      },
      data: {
        avatar,
      },
    });
    return { success: true };
  }

  private async getUserById(userId: string): Promise<{ account: PrismaAccount; profile: PrismaProfile } | null> {
    const account = await this.prisma.accounts.findFirst({
      where: {
        userId,
      },
    });
    if (!account) {
      return null;
    }
    const profile = await this.prisma.profiles.findFirst({
      where: {
        userId,
      },
    });
    if (!profile) {
      return null;
    }
    return { account, profile };
  }
}
