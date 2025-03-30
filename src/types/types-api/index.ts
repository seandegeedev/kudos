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

export type APIResponseStatus = APIResponse<{ version: string; getStartedRequired: boolean }>;

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
