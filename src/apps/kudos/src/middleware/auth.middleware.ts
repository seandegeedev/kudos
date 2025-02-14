import { NextRequest } from 'next/server';

export const isGetStartedRequired = async (req: NextRequest): Promise<boolean> => {
  return true;
};

export const isLoggedIn = (req: NextRequest) => {};
