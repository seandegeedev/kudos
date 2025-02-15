import { PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const requiresGettingStarted = async (): Promise<boolean> => {
  try {
    /* Check if there are any admin users in the database */
    const adminUsers = await prisma.user.findMany({
      where: {
        admin: true,
      },
    });

    /* If no admin user exists, return true */
    return adminUsers.length === 0;
  } catch (error) {
    throw new Error(`Error checking if getting started is required: ${error}`);
  }
};
