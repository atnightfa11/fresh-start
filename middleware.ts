import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get hostname from request (e.g. heathergrass.com, fresh-start-beta.vercel.app)
  const hostname = request.headers.get('host') || '';

  // If the request is coming from heathergrass.com
  if (hostname.includes('heathergrass.com')) {
    // Check if the path starts with /ai-marketing
    if (request.nextUrl.pathname.startsWith('/ai-marketing')) {
      // Keep the request as is
      return NextResponse.next();
    }
  }

  // For all other cases, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
}; 