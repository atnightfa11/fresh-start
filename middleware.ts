import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For root path, redirect to /ai-marketing
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ai-marketing', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 