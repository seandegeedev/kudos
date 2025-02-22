import { z } from 'zod';
import kudosAPI from '@/src/api';

const Response = z.object({
  status: z.number(),
  error: z.unknown(),
  data: z.unknown(),
});

type APIStatus =
  | {
      error: null;
      status: {
        getStartedRequired: boolean;
        version: string;
      };
    }
  | {
      error: string;
      status: null;
    };

export const getAPIStatus = async (): Promise<APIStatus> => {
  const StatusResponse = Response.extend({
    data: z.object({
      getStartedRequired: z.boolean(),
      version: z.string(),
    }),
  });

  try {
    const response = await kudosAPI.fetch('status');

    if (!response.ok) return { error: 'API not reachable', status: null };

    const result = await response.json();

    const parsedResult = StatusResponse.safeParse(result);
    if (!parsedResult.success || parsedResult.data.status !== 200) {
      return { error: 'Unexpected API Response', status: null };
    }

    return { error: null, status: parsedResult.data.data };
  } catch (_error) {
    return { error: 'API not reachable', status: null };
  }
};
