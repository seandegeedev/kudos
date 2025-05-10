import jwt from 'jsonwebtoken';
import z from 'zod';
import { randomInt } from 'crypto';
import authDB from '@endpoints/auth/auth.db';
import { addEmailVerificationJob, addPasswordResetJob } from '@/job-engine/queues/emailQueue';
import type ms from 'ms';

import type { Request, Response, NextFunction } from 'express';
import type {
  APIResponseNoData,
  APIResponseAuthLogin,
  APIResponseAuthVerify,
  APIResponseBootstrapAdmin,
  ExpressLocals,
  APIResponseUserVerify,
} from '@kudos/types-api';

// Get environment variables
const JWT_SECRET = process.env.API_JWT_SECRET || 'kudos_secret';
const COOKIE_NAME = process.env.API_COOKIE_NAME || 'kudos_auth';
const COOKIE_EXPIRATION = process.env.API_COOKIE_EXPIRATION
  ? Number(process.env.API_COOKIE_EXPIRATION)
  : 60 * 60 * 1000;
const TOKEN_EXPIRATION = (process.env.API_JWT_TOKEN_EXPIRATION || '1h') as ms.StringValue;

// Route protection middleware
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    // Check if token cookie is provided with request 🍪
    if (!token) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
      return;
    }

    const tokenPayload = jwt.verify(token, JWT_SECRET);

    // Check if token is valid ✅
    if (typeof tokenPayload !== 'object') {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
    }

    // Check if user exists
    const userID = (tokenPayload as { user: string }).user;
    const user = await authDB.getUserByID(userID);

    if (!user) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Username or password is incorrect',
        data: null,
      };

      res.json(response);
      return;
    }

    // Set user in express locals 👤
    const locals: ExpressLocals = {
      user: {
        id: user.id,
        created: user.created,
        archived: user.archived,
        email: user.email,
        verified: user.verified,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      },
    };

    res.locals = locals;

    // Create and send response cookie 🍪
    const cookieExpirationDate = new Date(Date.now() + COOKIE_EXPIRATION);

    res.cookie(COOKIE_NAME, jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }), {
      httpOnly: true,
      secure: false,
      expires: cookieExpirationDate,
    });

    next();
  } catch (error) {
    // If the error thrown is a JsonWebTokenError, return 401
    if (error instanceof jwt.JsonWebTokenError) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
    }

    // Else, return 500
    const response: APIResponseNoData = {
      status: 500,
      error: error,
      data: null,
    };

    res.json(response);
  }
};

// Route protection middleware for admin only
export const protectAdminOnly = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const locals = res.locals as ExpressLocals;

    // Check if user is logged in, if not, return 401
    if (!locals) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
      return;
    }

    // If the user is an admin, continue, else return 403
    if (!locals.user?.admin) {
      const response: APIResponseNoData = {
        status: 403,
        error: 'Forbidden',
        data: null,
      };

      res.json(response);
      return;
    }

    next();
  } catch (error) {
    const response: APIResponseNoData = {
      status: 500,
      error: error,
      data: null,
    };

    res.json(response);
  }
};

// Login Endpoint 🔑
export const login = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];

    // Check if authorization header is provided ✅
    if (!authHeader) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
      return;
    }

    // Check if authorization header is in the correct format ✅
    const authHeaderParts = authHeader.split(' ');

    if (authHeaderParts.length !== 2) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
      return;
    }

    // Check if authorization header contains basic auth ✅
    const [username, password] = Buffer.from(authHeaderParts[1], 'base64').toString().split(':');

    if (!username || !password) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Unauthorized',
        data: null,
      };

      res.json(response);
      return;
    }

    // Verify login credentials
    const { verified, user } = await authDB.verifyCredentials({ email: username, password: password });

    if (!verified || !user) {
      const response: APIResponseNoData = {
        status: 401,
        error: 'Username or password is incorrect',
        data: null,
      };

      res.json(response);
      return;
    }

    // Create response object 📦
    const response: APIResponseAuthLogin = {
      status: 200,
      error: null,
      data: {
        user: {
          id: user.id,
          created: user.created,
          archived: user.archived,
          email: user.email,
          verified: user.verified,
          firstName: user.firstName,
          lastName: user.lastName,
          admin: user.admin,
        },
      },
    };

    // Create response cookie 🍪
    const cookieExpirationDate = new Date(Date.now() + COOKIE_EXPIRATION);

    res
      .cookie(COOKIE_NAME, jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }), {
        httpOnly: true,
        secure: false,
        expires: cookieExpirationDate,
      })
      .json(response);
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

// Logout endpoint 🔑
export const logout = async (_req: Request, res: Response) => {
  try {
    const response: APIResponseNoData = {
      status: 200,
      error: null,
      data: null,
    };

    // Clear cookie 🍪
    res.clearCookie(COOKIE_NAME).json(response);
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

// Endpoint to verify if user is logged in 🔑
export const verify = async (_req: Request, res: Response) => {
  const locals = res.locals as ExpressLocals;
  const userData = locals.user;

  if (!userData) {
    const response: APIResponseNoData = {
      status: 401,
      error: 'Unauthorized',
      data: null,
    };

    res.json(response);
    return;
  }

  const response: APIResponseAuthVerify = {
    status: 200,
    error: null,
    data: { user: userData },
  };

  res.json(response);
  return;
};

// Send email verification mail for logged in user 🔑
export const sendEmailVerification = async (req: Request, res: Response) => {
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
    // Create and store a random 4-digit email verification code
    const code: string = `${randomInt(1000, 10000)}`;

    await authDB.storeEmailVerificationCode({ userID: userData.id, code });

    // Create verification email job
    await addEmailVerificationJob({
      firstName: userData.firstName,
      email: userData.email,
      code,
    });

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

// Confirm email verification code 🔑
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    // Check if request body is provided and valid
    const requestSchema = z.object({
      userID: z.string().nonempty(),
      code: z.string().nonempty(),
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

    const { userID, code } = validRequest.data;

    // Check if token is valid ✅
    const validCode = await authDB.validateVerificationCode({ userID, code });

    if (!validCode) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invalid verification token',
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

// Confirm if user exists 🔑
export const verifyUser = async (req: Request, res: Response) => {
  try {
    // Check if request body is provided and valid
    const requestSchema = z.object({
      userID: z.string().nonempty(),
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

    const { userID } = validRequest.data;

    // Check if user exists ✅
    const user = await authDB.getUserByID(userID);

    if (!user) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'User does not exist',
        data: null,
      };

      res.json(response);
      return;
    }

    // Censor email address
    const emailParts = user.email.split('@');
    const censoredEmail = `${emailParts[0].substring(0, 3)}...@${emailParts[1]}`;

    const response: APIResponseUserVerify = {
      status: 200,
      error: null,
      data: {
        user: {
          id: user.id,
          created: user.created,
          archived: user.archived,
          email: censoredEmail,
          verified: user.verified,
          firstName: user.firstName,
          lastName: user.lastName,
          admin: user.admin,
        },
      },
    };

    res.json(response);
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

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
  // Check if request body is provided and valid
  const requestSchema = z.object({
    email: z.string().nonempty(),
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

  const { email } = validRequest.data;

  try {
    // Check if user exists
    const user = await authDB.getUserByEmail(email);

    if (!user) {
      const response: APIResponseNoData = {
        status: 404,
        error: 'User does not exist',
        data: null,
      };

      res.json(response);
      return;
    }

    // Create and store a jwt token
    const token: string = jwt.sign({ user: user.id }, JWT_SECRET);

    await authDB.storeForgottenPasswordToken({ userID: user.id, token });

    // Create password reset email job
    await addPasswordResetJob({
      firstName: user.firstName,
      email,
      token,
    });

    const response: APIResponseNoData = {
      status: 200,
      error: null,
      data: null,
    };

    res.json(response);
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

export const resetPassword = async (req: Request, res: Response) => {
  // Check if request body is provided and valid
  const requestSchema = z.object({
    token: z.string().nonempty(),
    password: z.string().nonempty(),
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

  const { token, password } = validRequest.data;

  try {
    // Check if token is valid and change password ✅
    const wasTokenValid = await authDB.resetPassword({ token, password });

    if (!wasTokenValid) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invalid token',
        data: null,
      };

      res.json(response);
      return;
    }

    // Create response object 📦
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

// Bootstrap admin user if not already created
export const bootstrapAdminUser = async (req: Request, res: Response) => {
  try {
    const requestSchema = z.object({
      email: z.string().email(),
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
      password: z.string().min(8).max(32),
    });

    const validRequest = requestSchema.safeParse(req.body);

    // Check if request body is provided and valid
    if (!validRequest.success) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'Invalid request body',
        data: null,
      };

      res.json(response);
      return;
    }

    // Check if admin setup is actually required
    const bootstrapRequired = await authDB.adminBootstrapRequired();

    if (!bootstrapRequired) {
      const response: APIResponseNoData = {
        status: 400,
        error: 'An admin user already exists',
        data: null,
      };

      res.json(response);
      return;
    }

    const { firstName, lastName, email, password } = validRequest.data;

    // Bootstrap the admin user
    const user = await authDB.bootstrapAdmin({ email, firstName, lastName, password });

    // Create and store a random 4-digit email verification code
    const code: string = `${randomInt(1000, 10000)}`;

    await authDB.storeEmailVerificationCode({ userID: user.id, code });

    // Create verification email job
    await addEmailVerificationJob({
      firstName,
      email,
      code,
    });

    // Create response object 📦
    const response: APIResponseBootstrapAdmin = {
      status: 200,
      error: null,
      data: {
        user: {
          id: user.id,
          created: user.created,
          archived: user.archived,
          email: user.email,
          verified: user.verified,
          firstName: user.firstName,
          lastName: user.lastName,
          admin: user.admin,
        },
      },
    };

    // Create response cookie 🍪
    const cookieExpirationDate = new Date(Date.now() + COOKIE_EXPIRATION);

    res
      .cookie(COOKIE_NAME, jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }), {
        httpOnly: true,
        secure: false,
        expires: cookieExpirationDate,
      })
      .json(response);
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
