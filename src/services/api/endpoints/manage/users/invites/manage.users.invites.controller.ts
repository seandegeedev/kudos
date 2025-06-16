import { z } from 'zod';
import manageUsersInvitesDB from '@endpoints/manage/users/invites/manage.users.invites.db';
import type { Request, Response } from 'express';
import type { APIResponseNoData, APIResponseInvites } from '@kudos/types-api';

export const getInvites = async (req: Request, res: Response) => {
  const querySchema = z.object({
    search: z.string().optional(),
    size: z.number().optional(),
    page: z.number().optional(),
  });

  const query = querySchema.safeParse(req.query);

  if (!query.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid query parameters',
      data: null,
    };
    res.json(response);
    return;
  }

  const { search: emailSearch, size, page } = query.data;

  try {
    const responseData = await manageUsersInvitesDB.getInvites({
      emailSearch,
      size,
      page,
    });

    const response: APIResponseInvites = {
      status: 200,
      error: null,
      data: responseData,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to fetch invite: ' + error,
      data: null,
    };

    res.json(response);
    return;
  }
};
