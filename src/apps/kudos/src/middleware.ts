import { NextRequest, NextResponse } from 'next/server';
import { isGetStartedRequired } from '@/src/middleware/auth.middleware';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
};

export const middleware = async (request: NextRequest) => {
  /* Get started check - also functions as API reachability check */
  try {
    const redirectToGetStartedScreen = await isGetStartedRequired();

    if (redirectToGetStartedScreen && !request.nextUrl.pathname.startsWith('/get-started')) {
      return NextResponse.redirect(new URL('/get-started', request.url));
    }
  } catch (_error) {
    /* If alredy being directed to /fokkit, proceed */
    if (request.nextUrl.pathname.startsWith('/fokkit')) return NextResponse.next();

    /* Otherwise, go to /fokkit */
    return NextResponse.redirect(new URL('/fokkit', request.url));
  }

  /* Redirect the user back home if they explicity try to go to /fokkit */
  if (request.nextUrl.pathname.startsWith('/fokkit')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  /* Redirect the user back home if they explicity try to go to /get-started */
  if (request.nextUrl.pathname.startsWith('/get-started')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
