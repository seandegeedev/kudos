import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const verifyCredentials = async (details: {
  email: string;
  password: string;
}): Promise<{ verified: true; user: Prisma.UserGetPayload<object> } | { verified: false; user: null }> => {
  try {
    // Get user associated with email 👤
    const user = await prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    // If user exists and password matches, return user ✅
    if (user && (await bcrypt.compare(details.password, user.password))) {
      return { verified: true, user: user };
    }

    // Otherwise, return null and unverified
    return { verified: false, user: null };
  } catch (error) {
    throw new Error(`Error verifying credentials: ${error}`);
  }
};

export const getUserByID = async (userID: string): Promise<Prisma.UserGetPayload<object> | null> => {
  try {
    // Return user by with provided id if it exists, returns null otherwise
    return await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
  } catch (error) {
    throw new Error(`Failed to get user: ${error}`);
  }
};

export const getUserByEmail = async (email: string): Promise<Prisma.UserGetPayload<object> | null> => {
  try {
    // Return user by with provided email if it exists, returns null otherwise
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error}`);
  }
};

export const validateVerificationCode = async (details: { userID: string; code: string }): Promise<boolean> => {
  try {
    // Check if token exists in the database
    const emailToken = await prisma.emailVerificationCode.findUnique({
      where: {
        userID: details.userID,
        code: details.code,
      },
    });

    // If token exists, return true ✅
    if (emailToken) {
      // Change user's verified status to true
      await prisma.user.update({
        where: {
          id: details.userID,
        },
        data: {
          verified: true,
        },
      });

      // Delete token from the database
      await prisma.emailVerificationCode.delete({
        where: {
          userID: details.userID,
          code: details.code,
        },
      });

      return true;
    }

    // Otherwise, return false ❌
    return false;
  } catch (error) {
    throw new Error(`Failed to validate verification token: ${error}`);
  }
};

export const adminBootstrapRequired = async (): Promise<boolean> => {
  try {
    // Check if any admin users exist in the database
    const adminUsers = await prisma.user.findMany({
      where: {
        admin: true,
      },
    });

    // If no admin users exist, return true else false
    return adminUsers.length === 0;
  } catch (error) {
    throw new Error(`Failed to check if admin bootstrap is required: ${error}`);
  }
};

export const bootstrapAdmin = async (details: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}): Promise<Prisma.UserGetPayload<object>> => {
  try {
    const hashedPassword = await bcrypt.hash(details.password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        password: hashedPassword,
        admin: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error(`Failed to bootstrap admin user: ${error}`);
  }
};

export const storeEmailVerificationCode = async (details: { userID: string; code: string }): Promise<void> => {
  try {
    // Check if token already exists for the user
    const existingToken = await prisma.emailVerificationCode.findUnique({
      where: {
        userID: details.userID,
      },
    });

    // If token exists, update it with the new token, otherwise, create a new token
    if (existingToken) {
      await prisma.emailVerificationCode.update({
        where: {
          id: existingToken.id,
        },
        data: {
          code: details.code,
        },
      });
    } else {
      await prisma.emailVerificationCode.create({
        data: {
          userID: details.userID,
          code: details.code,
        },
      });
    }
  } catch (error) {
    throw new Error(`Failed to store email verification code: ${error}`);
  }
};

export const storeForgottenPasswordToken = async (details: { userID: string; token: string }): Promise<void> => {
  try {
    // Check if token already exists for the user
    const existingToken = await prisma.forgottenPasswordToken.findUnique({
      where: {
        userID: details.userID,
      },
    });

    // If token exists, update it with the new token, otherwise, create a new token
    if (existingToken) {
      await prisma.forgottenPasswordToken.update({
        where: {
          id: existingToken.id,
        },
        data: {
          token: details.token,
        },
      });
    } else {
      await prisma.forgottenPasswordToken.create({
        data: {
          userID: details.userID,
          token: details.token,
        },
      });
    }
  } catch (error) {
    throw new Error(`Failed to store forgotten password token: ${error}`);
  }
};

export const invalidateForgottenPasswordToken = async (userID: string): Promise<void> => {
  try {
    // Delete the token from the database
    await prisma.forgottenPasswordToken.deleteMany({
      where: {
        userID,
      },
    });
  } catch (error) {
    throw new Error(`Failed to invalidate forgotten password token: ${error}`);
  }
};

export default {
  verifyCredentials,
  getUserByID,
  validateVerificationCode,
  adminBootstrapRequired,
  bootstrapAdmin,
  storeEmailVerificationCode,
  storeForgottenPasswordToken,
  invalidateForgottenPasswordToken,
  getUserByEmail,
};
