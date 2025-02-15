import { version } from '@/package.json';
import type { APIResponseNoData, APIResponseStatus } from '@kudos/types-api';
import type { Request, Response } from 'express';

export const status = async (req: Request, res: Response) => {
  try {
    const getStartedRequired = true;

    const response: APIResponseStatus = {
      status: 200,
      error: null,
      data: {
        version: version,
        getStartedRequired: getStartedRequired,
      },
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
