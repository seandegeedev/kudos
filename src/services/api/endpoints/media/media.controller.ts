import z from 'zod';
import mediaDB from '@endpoints/media/media.db';
import mediaFile from '@endpoints/media/media.file';
import type { Request, Response } from 'express';
import type { APIResponseNoData, ExpressLocals, APIResponseMediaAccountAvatar } from '@kudos/types-api';

export const getAccountAvatar = async (req: Request, res: Response) => {
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
  // Get the avatar from the database
  const avatar = await mediaDB.getAccountAvatar(locals.user.id);

  // If avatar is not found, return 404
  if (!avatar) {
    const response: APIResponseNoData = {
      status: 404,
      error: 'Avatar not found',
      data: null,
    };

    res.json(response);
    return;
  }
  // If avatar is found, return it
  const response: APIResponseMediaAccountAvatar = {
    status: 200,
    error: null,
    data: {
      filename: avatar.filename,
      scale: avatar.scale.toNumber(),
      offsetX: avatar.offsetX.toNumber(),
      offsetY: avatar.offsetY.toNumber(),
    },
  };

  res.json(response);
  return;
};

export const uploadAccountAvatar = async (req: Request, res: Response) => {
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

  try {
    const previousAvatar = await mediaDB.setAccountAvatar({
      userID: locals.user.id,
      avatar: {
        filename: file.filename,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
      },
    });

    // If there was a previous avatar, delete it
    if (previousAvatar) {
      await mediaFile.deleteAvatar(previousAvatar);
    }
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

export const adjustAccountAvatar = async (req: Request, res: Response) => {
  const locals = res.locals as ExpressLocals;

  // Check if request body is provided and valid
  const requestSchema = z.object({
    scale: z.number().optional().default(1),
    offsetX: z.number().optional().default(0),
    offsetY: z.number().optional().default(0),
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

  const { scale, offsetX, offsetY } = validRequest.data;

  // Update avatar adjustments in the database
  try {
    await mediaDB.updateAccountAvatarAdjustments({
      userID: locals.user.id,
      adjustments: {
        scale,
        offsetX,
        offsetY,
      },
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

export const cancelAccountAvatar = async (_req: Request, res: Response) => {
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

  try {
    const uploadedAvatar = await mediaDB.cancelAccountAvatar({
      userID: locals.user.id,
    });

    if (uploadedAvatar) {
      await mediaFile.deleteAvatar(uploadedAvatar);
    }
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to cancel avatar: ' + error,
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

export const removeAccountAvatar = async (_req: Request, res: Response) => {
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

  try {
    const avatars = await mediaDB.removeAccountAvatar({
      userID: locals.user.id,
    });

    if (avatars) {
      await mediaFile.deleteAvatar(avatars.current);

      if (avatars.previous) {
        await mediaFile.deleteAvatar(avatars.previous);
      }
    }
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: 'Failed to remove avatar: ' + error,
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
