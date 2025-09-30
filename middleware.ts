
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // `/_next/` and `/api/` are ignored by the middleware, but we need to ignore static files
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      // Your other files in `public`
    ].includes(pathname)
  ) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = 'en'; // Default locale

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico)._)'],
};
