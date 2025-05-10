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

export default {
  updateAccountDetails,
};
