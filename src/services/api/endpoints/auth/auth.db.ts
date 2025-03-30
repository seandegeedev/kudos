import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const verifyCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ verified: true; user: Prisma.UserGetPayload<object> } | { verified: false; user: null }> => {
  try {
    // Get user associated with email 👤
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user exists and password matches, return user ✅
    if (user && (await bcrypt.compare(password, user.password))) {
      return { verified: true, user: user };
    }

    // Otherwise, return null and unverified
    return { verified: false, user: null };
  } catch (error) {
    throw new Error(`Error verifying credentials: ${error}`);
  }
};

export const getUserByID = async (id: string): Promise<Prisma.UserGetPayload<object> | null> => {
  try {
    // Return user by with provided id if it exists, returns null otherwise
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(`Failed to get user: ${error}`);
  }
};

export const validateVerificationToken = async (token: string): Promise<boolean> => {
  try {
    // Check if token exists in the database
    const emailToken = await prisma.emailVerificationToken.findUnique({
      where: {
        token: token,
      },
    });

    // If token exists, return true ✅
    if (emailToken) {
      // Change user's verified status to true
      await prisma.user.update({
        where: {
          email: emailToken.email,
        },
        data: {
          verified: true,
        },
      });

      // Delete token from the database
      await prisma.emailVerificationToken.delete({
        where: {
          token: token,
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

export default {
  verifyCredentials,
  getUserByID,
  validateVerificationToken,
};
