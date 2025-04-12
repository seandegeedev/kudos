/*
 * 1. Express Locals object
------------------------------------------------------------------------------------------------
 */

export type ExpressLocals = {
  user: {
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
  } | null;
};

/*
 * 2. API Responses
------------------------------------------------------------------------------------------------
 */
export type APIResponse<T> =
  | {
      status: number;
      error: unknown;
      data: null;
    }
  | {
      status: number;
      error: null;
      data: T;
    };

export type APIResponseNoData = APIResponse<null>;

/*
 * 2.1 GET /api/status
------------------------------------------------------------------------------------------------
 */
export type APIResponseStatus = APIResponse<{ version: string; getStartedRequired: boolean }>;

/*
 * 2.2 GET /api/auth/verify
------------------------------------------------------------------------------------------------
  */

export type APIResponseAuthVerify = APIResponse<{
  user: {
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
  };
}>;

/*
 * 2.3 GET /api/auth/login
------------------------------------------------------------------------------------------------
 */
export type APIResponseAuthLogin = APIResponse<{
  user: {
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
  };
}>;
