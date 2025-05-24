import { Prisma, PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

const getKudosInvitationByCode = async (details: {
  inviteCode: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Get a Kudos invitation by code
    const invite = await prisma.kudosInvite.findUnique({
      where: { code: details.inviteCode },
    });

    return invite;
  } catch (error) {
    throw new Error(`Failed to get Kudos invitation: ${error}`);
  }
};

const getKudosInvitationByID = async (details: {
  inviteID: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Get a Kudos invitation by ID
    const invite = await prisma.kudosInvite.findUnique({
      where: { id: details.inviteID },
    });

    return invite;
  } catch (error) {
    throw new Error(`Failed to get Kudos invitation: ${error}`);
  }
};

const getKudosInvitationsByEmail = async (details: {
  email: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Get Kudos invitations by email
    const invite = await prisma.kudosInvite.findUnique({
      where: { email: details.email },
    });

    return invite;
  } catch (error) {
    throw new Error(`Failed to get Kudos invitations: ${error}`);
  }
};

const createKudosInvitation = async (details: {
  fromID: string;
  email: string;
  code: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Create a new Kudos invitation
    const invite = await prisma.kudosInvite.create({
      data: {
        fromID: details.fromID,
        email: details.email,
        code: details.code,
      },
    });

    return invite;
  } catch (error) {
    throw new Error(`Failed to create Kudos invitation: ${error}`);
  }
};

const doesKudosInvitationForEmailExist = async (details: { email: string }): Promise<boolean> => {
  try {
    // Check if a Kudos invitation for the given email exists
    const invite = await prisma.kudosInvite.findUnique({
      where: { email: details.email },
    });
    return invite !== null;
  } catch (error) {
    throw new Error(`Failed to check Kudos invitation existence: ${error}`);
  }
};

const archiveKudosInvitation = async (details: {
  inviteID: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Archive a Kudos invitation
    const invite = await prisma.kudosInvite.update({
      where: { id: details.inviteID },
      data: {
        archived: true,
      },
    });
    return invite;
  } catch (error) {
    throw new Error(`Failed to archive Kudos invitation: ${error}`);
  }
};

const removeKudosInvitation = async (details: {
  inviteID: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Remove a Kudos invitation
    const invite = await prisma.kudosInvite.delete({
      where: { id: details.inviteID },
    });
    return invite;
  } catch (error) {
    throw new Error(`Failed to remove Kudos invitation: ${error}`);
  }
};

const redeemKudosInvitation = async (details: {
  inviteID: string;
}): Promise<Prisma.KudosInviteGetPayload<object> | null> => {
  try {
    // Redeem a Kudos invitation
    const invite = await prisma.kudosInvite.update({
      where: { id: details.inviteID },
      data: {
        redeemed: true,
      },
    });
    return invite;
  } catch (error) {
    throw new Error(`Failed to redeem Kudos invitation: ${error}`);
  }
};

export default {
  getKudosInvitationByCode,
  doesKudosInvitationForEmailExist,
  createKudosInvitation,
  archiveKudosInvitation,
  removeKudosInvitation,
  redeemKudosInvitation,
  getKudosInvitationByID,
  getKudosInvitationsByEmail,
};
