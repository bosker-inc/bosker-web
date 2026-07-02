import { NextRequest, NextResponse } from 'next/server';
import {
  getSubdomain,
  buildSubdomainUrl,
  PORTAL_SUBDOMAINS,
} from '@/lib/subdomain';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;
  const subdomain = getSubdomain(host);

  // Portal subdomain: rewrite clean URLs to the internal portal segment.
  // client.bosker.app/dashboard → /client/dashboard
  if (subdomain) {
    // Avoid double-prefixing if the internal path is hit directly.
    if (pathname.startsWith(`/${subdomain}/`) || pathname === `/${subdomain}`) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Root domain: redirect direct portal-path access to the proper subdomain.
  // bosker.app/client/dashboard → client.bosker.app/dashboard
  for (const portal of PORTAL_SUBDOMAINS) {
    if (pathname === `/${portal}` || pathname.startsWith(`/${portal}/`)) {
      const portalPath = pathname.slice(portal.length + 1) || '/';
      return NextResponse.redirect(buildSubdomainUrl(portal, portalPath));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes, and static assets.
    '/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|images|icons|fonts).*)',
  ],
};
