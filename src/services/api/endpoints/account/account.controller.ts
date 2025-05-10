import { z } from 'zod';
import accountDB from '@endpoints/account/account.db';
import type { Request, Response } from 'express';
import type { APIResponseNoData, ExpressLocals } from '@kudos/types-api';

export const updateAccountDetails = async (req: Request, res: Response) => {
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

  try {
    // Check if request body is provided and valid
    const requestSchema = z.object({
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
    });

    const validRequest = requestSchema.safeParse(req.body);

    if (!validRequest.success) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invalid request body',
        data: null,
      };

      res.json(response);
      return;
    }

    const userID = userData.id;
    const { firstName, lastName } = validRequest.data;

    // Update details in db ✏️
    await accountDB.updateAccountDetails({ userID, firstName, lastName });

    const response: APIResponseNoData = {
      status: 200,
      error: null,
      data: null,
    };

    res.json(response);
    return;
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: error,
      data: null,
    };

    res.json(response);
  }
};

//export const updateAccountPassword = async (req: Request, res: Response) => {};

//export const updateAccountEmail = async (req: Request, res: Response) => {};
