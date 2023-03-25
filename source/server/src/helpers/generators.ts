import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

export function hashPassword(password: string): string {
  const hash = crypto.createHash('sha512').update(password).digest('hex');
  return hash;
}

export async function createUserId(prisma: PrismaClient): Promise<string | null> {
  let id: number | null = Math.floor(Math.random() * 1000000000000000);
  let isCreated = false;
  let attempts = 0;

  while (!isCreated) {
    if (attempts === 5) {
      return null;
    }
    if (
      await prisma.accounts.findFirst({
        where: {
          userId: id.toString(),
        },
      })
    ) {
      id = Math.floor(Math.random() * 1000000000000000);
      attempts++;
    } else {
      isCreated = true;
    }
  }
  return id.toString();
}

export async function createMessageId(prisma: PrismaClient, messageGroupId: string): Promise<string | null> {
  let messageId: string | null = Math.floor(Math.random() * 1000000000000000).toString();
  let isCreated = false;
  let attempts = 0;

  while (!isCreated) {
    if (attempts === 5) {
      return null;
    }
    if (
      await prisma.messages.findFirst({
        where: {
          messageId: messageId,
          groupId: messageGroupId,
        },
      })
    ) {
      messageId = Math.floor(Math.random() * 1000000000000000).toString();
      attempts++;
    } else {
      isCreated = true;
    }
  }
  return messageId;
}

export async function createAuthorization(prisma: PrismaClient): Promise<string | null> {
  let authorization: string | null = crypto.randomBytes(64).toString('hex');
  let isCreated = false;
  let attempts = 0;

  while (!isCreated) {
    if (attempts === 5) {
      return null;
    }
    if (
      await prisma.accounts.findFirst({
        where: {
          authorization,
        },
      })
    ) {
      authorization = crypto.randomBytes(64).toString('hex');
      attempts++;
    } else {
      isCreated = true;
    }
  }
  return authorization;
}

export async function createVerificationCode(prisma: PrismaClient): Promise<string | null> {
  let verificationCode: string | null = crypto.randomBytes(40).toString('hex');
  let isCreated = false;
  let attempts = 0;

  while (!isCreated) {
    if (attempts === 5) {
      return null;
    }
    if (
      await prisma.accounts.findFirst({
        where: {
          verificationCode,
        },
      })
    ) {
      verificationCode = crypto.randomBytes(64).toString('hex');
      attempts++;
    } else {
      isCreated = true;
    }
  }
  return verificationCode;
}

export async function createPostId(prisma: PrismaClient): Promise<string | null> {
  let id: number | null = Math.floor(Math.random() * 1000000000000000);
  let isCreated = false;
  let attempts = 0;

  while (!isCreated) {
    if (attempts === 5) {
      return null;
    }
    if (
      await prisma.posts.findFirst({
        where: {
          postId: id.toString(),
        },
      })
    ) {
      id = Math.floor(Math.random() * 1000000000000000);
      attempts++;
    } else {
      isCreated = true;
    }
  }
  return id.toString();
}
