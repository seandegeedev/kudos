import { setUserAccountAvatar } from '@endpoints/media/media.db';
import type { Request, Response } from 'express';
import type { APIResponseNoData, ExpressLocals } from '@kudos/types-api';

export const uploadAvatar = async (req: Request, res: Response) => {
  const locals = res.locals as ExpressLocals;

  // Check if user is logged in, if not, return 401
  if (!locals || !locals.user) {
    const response: APIResponseNoData = {
      status: 401,
      error: 'Unauthorized',
      data: null,
    };

    res.json(response);
    return;
  }

  const { file } = req;

  // Check if file is present
  if (!file) {
    const response: APIResponseNoData = {
      status: 400,
      error: 'No file uploaded',
      data: null,
    };

    res.json(response);
    return;
  }

  // Update avatar file name in the database
  try {
    await setUserAccountAvatar({
      userID: locals.user.id,
      avatar: file.filename,
    });
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to update avatar: ' + error,
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
};
