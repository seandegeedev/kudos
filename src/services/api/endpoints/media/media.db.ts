import { PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const setUserAccountAvatar = async (details: { userID: string; avatar: string }): Promise<void> => {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: details.userID,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Update user's avatar
    await prisma.user.update({
      where: {
        id: details.userID,
      },
      data: {
        avatar: details.avatar,
      },
    });
  } catch (error) {
    throw new Error(`Failed to set user account avatar: ${error}`);
  }
};
