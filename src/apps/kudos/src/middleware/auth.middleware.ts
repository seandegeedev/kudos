import { NextRequest } from 'next/server';

export const isGetStartedRequired = async (req: NextRequest): Promise<boolean> => {
  return false;
};

export const isLoggedIn = (req: NextRequest) => {};
