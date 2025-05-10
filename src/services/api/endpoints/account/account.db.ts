import bcrypt from 'bcrypt';
import { PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

export const updateAccountDetails = async ({
  userID,
  firstName,
  lastName,
}: {
  userID: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        firstName,
        lastName,
      },
    });
  } catch (error) {
    throw new Error(`Error updating account details: ${error}`);
  }
};

export const updateAccountPassword = async ({
  userID,
  currentPassword,
  newPassword,
}: {
  userID: string;
  currentPassword: string;
  newPassword: string;
}): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return false; // Current password is incorrect
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  } catch (error) {
    throw new Error(`Error updating account password: ${error}`);
  }
};

export const updateAccountEmail = async ({
  userID,
  newEmail,
}: {
  userID: string;
  newEmail: string;
}): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const emailExists = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });

    if (emailExists) {
      return false; // Email already exists
    }

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        email: newEmail,
        verified: false,
      },
    });

    return true;
  } catch (error) {
    throw new Error(`Error updating account email: ${error}`);
  }
};

export default {
  updateAccountDetails,
  updateAccountPassword,
  updateAccountEmail,
};
