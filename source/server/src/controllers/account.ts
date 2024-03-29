import { PrismaClient } from '@prisma/client';
import { server } from '../managers/server';
import handler from '../helpers/handler';
import { AccountSettings } from '../config';
import { createAuthorization, createUserId, createVerificationCode, hashPassword } from '../helpers/generators';
import { verification } from '../helpers/emailer';
import { logController } from '../helpers/logger';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/account/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if values are not null
    if (!email || !password) {
      return {
        success: false,
        error: 'Missing fields',
        authorization: null,
      };
    }

    // Check if email exists
    const account = await prisma.accounts.findFirst({
      where: {
        email,
      },
    });
    if (!account) {
      return {
        success: false,
        error: 'Account does not exist',
        authorization: null,
      };
    }

    // Check if password is correct
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== account.password) {
      return {
        success: false,
        error: 'Incorrect password',
        authorization: null,
      };
    }

    return {
      success: true,
      authorization: account.authorization,
    };
  });

  handler.POST(server.v1, '/account/signup', async (req, res) => {
    const { email, password, username } = req.body;

    // Check if values are not null
    if (!email || !password || !username) {
      return {
        success: false,
        error: 'Missing fields',
        authorization: null,
      };
    }

    // Validate values
    if (!email.includes('@')) {
      return {
        success: false,
        error: 'Invalid email',
        authorization: null,
      };
    }
    if (AccountSettings.illegalUsernameCharacters.some((char: string) => username.includes(char))) {
      return {
        success: false,
        error: 'Username contains illegal characters',
        authorization: null,
      };
    }
    if (username.length < AccountSettings.minUsernameLength) {
      return {
        success: false,
        error: 'Username is too short',
        authorization: null,
      };
    }
    if (username.length > AccountSettings.maxUsernameLength) {
      return {
        success: false,
        error: 'Username is too long',
        authorization: null,
      };
    }
    if (password.length < AccountSettings.minPasswordLength) {
      return {
        success: false,
        error: 'Password is too short',
        authorization: null,
      };
    }

    // Check if email is already in use
    if (
      await prisma.accounts.findFirst({
        where: {
          email,
        },
      })
    ) {
      return {
        success: false,
        error: 'Email is already in use',
        authorization: null,
      };
    }

    // Check if username is already in use
    if (
      await prisma.profiles.findFirst({
        where: {
          username,
        },
      })
    ) {
      return {
        success: false,
        error: 'Username is already in use',
        authorization: null,
      };
    }

    // Create userId
    const userId = await createUserId(prisma);
    if (!userId) {
      return {
        success: false,
        error: 'Something went wrong',
        authorization: null,
      };
    }

    // Create authorization
    const authorization = await createAuthorization(prisma);
    if (!authorization) {
      return {
        success: false,
        error: 'Something went wrong',
        authorization: null,
      };
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create verification code
    const verificationCode = await createVerificationCode(prisma);
    if (!verificationCode) {
      return {
        success: false,
        error: 'Something went wrong',
        authorization: null,
      };
    }

    await verification(email, verificationCode);

    // Create account
    await prisma.accounts.create({
      data: {
        userId: userId,
        email: email,
        password: hashedPassword,
        verificationCode: verificationCode,
        authorization: authorization,
      },
    });
    await prisma.profiles.create({
      data: {
        userId: userId,
        username: username,
        avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
      },
    });

    return {
      success: true,
      authorization: authorization,
    };
  });

  handler.POST(server.v1, '/account/verify-email', async (req, res) => {
    const code: any = req.query.code;

    if (!code) {
      return { success: false, error: 'Missing fields' };
    }

    const account = await prisma.accounts.findFirst({
      where: {
        verificationCode: code,
      },
    });

    if (!account) {
      return { success: false, error: 'Invalid code' };
    }

    await prisma.accounts.update({
      where: {
        userId: account.userId,
      },
      data: {
        verifiedEmail: true,
      },
    });

    return { success: true };
  });

  logController('Account loaded');
};
