import { z } from 'zod';
import { randomInt } from 'crypto';
import authDB from '@endpoints/auth/auth.db';
import accountDB from '@endpoints/account/account.db';
import { addEmailVerificationJob } from '@/job-engine/queues/emailQueue';
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
    return;
  }
};

export const updateAccountPassword = async (req: Request, res: Response) => {
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
      currentPassword: z.string().nonempty(),
      newPassword: z.string().nonempty(),
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
    const { currentPassword, newPassword } = validRequest.data;

    // Update password in db 🔑
    const passwordUpdated = await accountDB.updateAccountPassword({
      userID,
      currentPassword,
      newPassword,
    });

    if (!passwordUpdated) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invalid current password',
        data: null,
      };

      res.json(response);
      return;
    }

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
    return;
  }
};

export const updateAccountEmail = async (req: Request, res: Response) => {
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
      email: z.string().nonempty().email(),
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
    const { email } = validRequest.data;

    // Update email in db 📧
    const emailUpdated = await accountDB.updateAccountEmail({
      userID,
      newEmail: email,
    });

    // Create and store a random 4-digit email verification code
    const code: string = `${randomInt(1000, 10000)}`;

    await authDB.storeEmailVerificationCode({ userID: userData.id, code });

    // Create verification email job
    await addEmailVerificationJob({
      firstName: userData.firstName,
      email: email,
      code,
    });

    if (!emailUpdated) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Email already exists',
        data: null,
      };

      res.json(response);
      return;
    }

    // Send verification email

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
    return;
  }
};
