import { z } from 'zod';
import { randomInt } from 'crypto';
import manageUsersDB from '@endpoints/manage/users/manage.users.db';
import type { Request, Response } from 'express';
import type { APIResponseNoData, APIResponseInvite, APIResponseNewUser, ExpressLocals } from '@kudos/types-api';

export const createInvite = async (req: Request, res: Response) => {
  const locals = res.locals as ExpressLocals;
  const userData = locals.user;

  // Check if user is logged in, if not, return 401
  if (!userData) {
    const response: APIResponseNoData = {
      status: 401,
      error: 'Unauthorized',
      data: null,
    };

    res.json(response);
    return;
  }

  const requestSchema = z.object({
    email: z.string().email(),
  });

  const request = requestSchema.safeParse(req.body);

  if (!request.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid request body',
      data: null,
    };

    res.json(response);
    return;
  }

  try {
    // Create and store a random 4-digit invitation code
    const code: string = `${randomInt(1000, 10000)}`;
    const fromID = userData.id;
    const { email } = request.data;

    // Check if an invitation for this email already exists
    const existingInvite = await manageUsersDB.doesKudosInvitationForEmailExist({ email });

    if (existingInvite) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'An invitation for this email already exists 💀',
        data: null,
      };

      res.json(response);
      return;
    }

    // Check if a user with this email already exists
    const existingUser = await manageUsersDB.getUserByEmail({ email });

    if (existingUser) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'A user with this email already exists 💀',
        data: null,
      };

      res.json(response);
      return;
    }

    const invitation = await manageUsersDB.createKudosInvitation({
      fromID,
      email,
      code,
    });

    if (!invitation) {
      const response: APIResponseNoData = {
        status: 500,
        error: 'Failed to create invite 💀',
        data: null,
      };

      res.json(response);
      return;
    }

    const response: APIResponseInvite = {
      status: 200,
      error: null,
      data: invitation,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to create invite 💀 ' + error,
      data: null,
    };

    res.json(response);
    return;
  }
};

export const getInvite = async (req: Request, res: Response) => {
  const querySchema = z.object({
    inviteID: z.string().optional(),
    email: z.string().email().optional(),
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

  const { inviteID, email } = query.data;

  if (!inviteID && !email) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Either inviteID or email must be provided',
      data: null,
    };
    res.json(response);
    return;
  }

  try {
    if (inviteID) {
      const invite = await manageUsersDB.getKudosInvitationByID({ inviteID });

      if (!invite) {
        const response: APIResponseNoData = {
          status: 404,
          error: 'Invite not found',
          data: null,
        };

        res.json(response);
        return;
      }

      const response: APIResponseInvite = {
        status: 200,
        error: null,
        data: invite,
      };

      res.json(response);
      return;
    } else if (email) {
      const invite = await manageUsersDB.getKudosInvitationsByEmail({ email });

      if (!invite) {
        const response: APIResponseNoData = {
          status: 404,
          error: 'Invite not found',
          data: null,
        };

        res.json(response);
        return;
      }

      const response: APIResponseInvite = {
        status: 200,
        error: null,
        data: invite,
      };

      res.json(response);
      return;
    }
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

export const getInviteByID = async (req: Request, res: Response) => {
  const paramsSchema = z.object({
    inviteID: z.string(),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid parameters',
      data: null,
    };

    res.json(response);
    return;
  }

  const { inviteID } = params.data;

  try {
    const invite = await manageUsersDB.getKudosInvitationByID({ inviteID });

    if (!invite) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'Invite not found',
        data: null,
      };

      res.json(response);
      return;
    }

    const response: APIResponseInvite = {
      status: 200,
      error: null,
      data: invite,
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

export const deleteInvite = async (req: Request, res: Response) => {
  const paramsSchema = z.object({
    inviteID: z.string(),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid parameters',
      data: null,
    };

    res.json(response);
    return;
  }

  const { inviteID } = params.data;

  try {
    const deleted = await manageUsersDB.deleteKudosInvite({ inviteID });

    if (!deleted) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'Invite not found or already deleted',
        data: null,
      };

      res.json(response);
      return;
    }

    const response: APIResponseInvite = {
      status: 200,
      error: null,
      data: deleted,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to delete invite: ' + error,
      data: null,
    };

    res.json(response);
    return;
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  const paramsSchema = z.object({
    inviteCode: z.string(),
  });

  const bodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
  });

  const params = paramsSchema.safeParse(req.params);
  const details = bodySchema.safeParse(req.body);

  if (!params.success || !details.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid parameters',
      data: null,
    };

    res.json(response);
    return;
  }

  const { inviteCode } = params.data;
  const { firstName, lastName, password } = details.data;

  try {
    const invite = await manageUsersDB.getKudosInvitationByCode({ inviteCode: inviteCode });

    if (!invite) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'Invite not found',
        data: null,
      };

      res.json(response);
      return;
    }

    // Check if the invite is already accepted
    if (invite.archived || invite.redeemed) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invite has already accepted or archived',
        data: null,
      };

      res.json(response);
      return;
    }

    // Create the user account
    const newUser = await manageUsersDB.createUser({
      firstName,
      lastName,
      email: invite.email,
      password,
    });

    await manageUsersDB.redeemKudosInvitation({ inviteID: invite.id });

    const response: APIResponseNewUser = {
      status: 200,
      error: null,
      data: newUser,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to accept invite: ' + error,
      data: null,
    };
    res.json(response);
    return;
  }
};

export const archiveInvite = async (req: Request, res: Response) => {
  const paramsSchema = z.object({
    inviteID: z.string(),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid parameters',
      data: null,
    };

    res.json(response);
    return;
  }

  const { inviteID } = params.data;

  try {
    const archivedInvite = await manageUsersDB.archiveKudosInvite({ inviteID });

    if (!archivedInvite) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'Invite not found or already archived',
        data: null,
      };

      res.json(response);
      return;
    }

    const response: APIResponseInvite = {
      status: 200,
      error: null,
      data: archivedInvite,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to archive invite: ' + error,
      data: null,
    };

    res.json(response);
    return;
  }
};

export const getInviteByCode = async (req: Request, res: Response) => {
  const querySchema = z.object({
    inviteCode: z.string(),
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

  const { inviteCode } = query.data;

  try {
    const invite = await manageUsersDB.getKudosInvitationByCode({ inviteCode });

    if (!invite) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'Invite not found',
        data: null,
      };

      res.json(response);
      return;
    }

    const response: APIResponseInvite = {
      status: 200,
      error: null,
      data: invite,
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
