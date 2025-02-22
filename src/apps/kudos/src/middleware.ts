import { NextRequest, NextResponse } from 'next/server';
import { getAPIStatus } from '@/src/middleware/api.middleware';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
};

export const middleware = async (request: NextRequest) => {
  /* Get started check - also functions as API reachability check */
  const apiStatus = await getAPIStatus();

  if (apiStatus.error || !apiStatus.status) {
    /* If alredy being directed to /fokkit, proceed */
    if (request.nextUrl.pathname.startsWith('/fokkit')) return NextResponse.next();

    /* Otherwise, go to /fokkit */
    return NextResponse.redirect(new URL('/fokkit', request.url));
  }

  const redirectToGettingStarted = apiStatus.status.getStartedRequired;

  if (redirectToGettingStarted) {
    /* If alredy being directed to /get-started, proceed */
    if (request.nextUrl.pathname.startsWith('/get-started')) return NextResponse.next();

    /* Otherwise, go to /get-started */
    return NextResponse.redirect(new URL('/get-started', request.url));
  }

  /* Redirect the user back home if they explicity try to go to /fokkit (no need as there is no API reachability error) */
  if (request.nextUrl.pathname.startsWith('/fokkit')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  /* Redirect the user back home if they explicity try to go to /get-started (no need as the gettings started setup is not required)*/
  if (request.nextUrl.pathname.startsWith('/get-started')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
