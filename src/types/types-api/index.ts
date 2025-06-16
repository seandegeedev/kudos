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

export type APIResponseList<T> = APIResponse<{
  data: T[];
  page: number;
  size: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pages: number;
  count: number;
}>;

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
    admin: boolean;
  };
}>;

/*
 * 2.3 GET /api/auth/bootstrap-admin
------------------------------------------------------------------------------------------------
 */
export type APIResponseBootstrapAdmin = APIResponse<{
  user: {
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    admin: boolean;
  };
}>;

/*
 * 2.3 GET /api/auth/verify-user
------------------------------------------------------------------------------------------------
 */
export type APIResponseUserVerify = APIResponse<{
  user: {
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    admin: boolean;
  };
}>;

/*
 * 3.1 GET /api/media/account/avatar
------------------------------------------------------------------------------------------------
 */
export type APIResponseMediaAccountAvatar = APIResponse<{
  filename: string;
  scale: number;
  offsetX: number;
  offsetY: number;
}>;

/*
 * 4.1 GET /api/manage/users
------------------------------------------------------------------------------------------------
 */

export type APIResponseInvite = APIResponse<{
  id: string;
  created: Date;
  archived: boolean;
  email: string;
  fromID: string;
  code: string;
  redeemed: boolean;
}>;

export type APIResponseNewUser = APIResponse<{
  id: string;
  created: Date;
  archived: boolean;
  email: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  admin: boolean;
}>;

export type APIResponseInvites = APIResponseList<{
  id: string;
  created: Date;
  archived: boolean;
  email: string;
  fromID: string;
  code: string;
  redeemed: boolean;
}>;
