import { NextRequest, NextResponse } from 'next/server';

import { isGetStartedRequired } from '@/src/middleware/auth.middleware';

export const middleware = async (request: NextRequest) => {
  const redirectToGetStartedScreen = await isGetStartedRequired(request);

  if (redirectToGetStartedScreen && !request.nextUrl.pathname.startsWith('/get-started')) {
    return NextResponse.redirect(new URL('/get-started', request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
};
