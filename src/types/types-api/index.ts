export type ExpressLocals = {
  user: Object | null;
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
