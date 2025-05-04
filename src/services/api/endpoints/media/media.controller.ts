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

  // Check if the file key is present and is correct
  if (file.fieldname !== 'avatar') {
    const response: APIResponseNoData = {
      status: 400,
      error: 'Invalid file key',
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

//export const getAvatar = async (req: Request, res: Response, next: NextFunction) => {};
