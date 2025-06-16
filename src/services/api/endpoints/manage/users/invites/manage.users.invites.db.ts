import { Prisma, PrismaClient } from '@kudos/database';

const prisma = new PrismaClient();

const getInvites = async (options: {
  emailSearch?: string;
  size?: number;
  page?: number;
}): Promise<{
  data: Prisma.KudosInviteGetPayload<object>[];
  size: number;
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pages: number;
  count: number;
}> => {
  const { size = 20, page = 1 } = options;

  try {
    const count = await prisma.kudosInvite.count({
      where: {
        email: options.emailSearch ? { contains: options.emailSearch } : undefined,
      },
    });

    const pages = Math.ceil(count / size);

    const normalisedPage = Math.max(1, Math.min(page, pages));

    const hasNextPage = normalisedPage * size < count;
    const hasPreviousPage = normalisedPage > 1;

    const invites = await prisma.kudosInvite.findMany({
      where: {
        email: options.emailSearch ? { contains: options.emailSearch } : undefined,
      },
      take: size,
      skip: size * (normalisedPage - 1),
    });

    return {
      data: invites,
      size: size,
      page: normalisedPage,
      hasNextPage,
      hasPreviousPage,
      pages,
      count,
    };
  } catch (error) {
    throw new Error(`Failed to get Kudos invitations: ${error}`);
  }
};

export default {
  getInvites,
};
