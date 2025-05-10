import { Prisma, PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const getAccountAvatar = async (userID: string): Promise<Prisma.UserAvatarGetPayload<object> | null> => {
  try {
    // Get user's avatar
    const avatar = await prisma.userAvatar.findUnique({
      where: { userID },
    });

    return avatar;
  } catch (error) {
    throw new Error(`Failed to get user account avatar: ${error}`);
  }
};

export const setAccountAvatar = async (details: {
  userID: string;
  avatar: { filename: string; scale: number; offsetX: number; offsetY: number };
}): Promise<string | null> => {
  try {
    // Get existing avatar if it exists
    const existingAvatar = await prisma.userAvatar.findUnique({
      where: { userID: details.userID },
    });

    if (existingAvatar) {
      // If avatar exists, update it
      await prisma.userAvatar.update({
        where: { userID: details.userID },
        data: {
          filename: details.avatar.filename,
          scale: details.avatar.scale,
          offsetX: details.avatar.offsetX,
          offsetY: details.avatar.offsetY,
        },
      });

      // Return the previous avatar's filename
      return existingAvatar.filename;
    }

    await prisma.userAvatar.create({
      data: {
        userID: details.userID,
        filename: details.avatar.filename,
        scale: details.avatar.scale,
        offsetX: details.avatar.offsetX,
        offsetY: details.avatar.offsetY,
      },
    });

    return null;
  } catch (error) {
    throw new Error(`Failed to set user account avatar: ${error}`);
  }
};

export const adjustAccountAvatar = async (details: {
  userID: string;
  adjustments: { scale: number; offsetX: number; offsetY: number };
}): Promise<void> => {
  try {
    // Update user's avatar
    await prisma.userAvatar.update({
      where: { userID: details.userID },
      data: {
        scale: details.adjustments.scale,
        offsetX: details.adjustments.offsetX,
        offsetY: details.adjustments.offsetY,
      },
    });
  } catch (error) {
    throw new Error(`Failed to update user account avatar adjustments: ${error}`);
  }
};

export const removeAccountAvatar = async (details: { userID: string }): Promise<string | null> => {
  try {
    // Check if user has an avatar
    const existingAvatar = await prisma.userAvatar.findUnique({
      where: { userID: details.userID },
    });

    if (!existingAvatar) {
      return null;
    }

    // Delete the avatar from the database
    await prisma.userAvatar.delete({
      where: { userID: details.userID },
    });

    // Return the filename of the deleted avatar
    return existingAvatar.filename;
  } catch (error) {
    throw new Error(`Failed to remove user account avatar: ${error}`);
  }
};

export default {
  getAccountAvatar,
  setAccountAvatar,
  adjustAccountAvatar,
  removeAccountAvatar,
};
