import { PrismaClient, Accounts as PrismaAccount, Profiles as PrismaProfile } from '@prisma/client';

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
      return { success: false, error: 'Profile manager: missing prisma' };
    }
    if (!this.key) {
      return { success: false, error: 'Profile manager: missing key' };
    }
    if (!this.method) {
      return { success: false, error: 'Profile manager: missing method' };
    }
    // Get the account
    if (this.method === 'token') {
      const account = await this.prisma.accounts.findFirst({
        where: {
          authorization: this.key,
        },
      });
      if (!account) {
        return { success: false, error: 'Profile manager: invalid token' };
      }
      this.account = account;
    } else if (this.method === 'id') {
      const account = await this.prisma.accounts.findFirst({
        where: {
          userId: this.key,
        },
      });
      if (!account) {
        return { success: false, error: 'Profile manager: invalid id' };
      }
      this.account = account;
    } else {
      return { success: false, error: 'Profile manager: invalid method' };
    }
    // Get the profile
    const profile = await this.prisma.profiles.findFirst({
      where: {
        userId: this.account.userId,
      },
    });
    if (!profile) {
      return { success: false, error: 'Profile manager: profile does not exist' };
    }
    this.profile = profile;
    // Get and sort the friends
    if (this.profile.friends.length > 0) {
      for (let i = 0; i < this.profile.friends.length; i++) {
        const friend = await this.prisma.profiles.findFirst({
          where: {
            userId: this.profile.friends[i],
          },
        });
        if (friend) {
          this.friends.push({
            userId: friend.userId,
            username: friend.username,
            avatar: friend.avatar,
          });
        }
      }
    }
    // Get and sort friend requests received
    if (this.profile.friendRequestsReceived.length > 0) {
    } // TODO
    // Get and sort friend requests sent
    if (this.profile.friendRequestsSent.length > 0) {
    } // TODO
    return { success: true };
  }
}
