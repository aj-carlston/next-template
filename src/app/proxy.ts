import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session token from cookies
  const session = request.cookies.get('sb-access-token');

  // Protected routes - everything except /auth
  const isProtectedRoute = !pathname.startsWith('/auth') && 
                          !pathname.startsWith('/_next') && 
                          !pathname.startsWith('/api');

  // If trying to access protected route without session, redirect to auth
  if (isProtectedRoute && !session) {
    const url = new URL('/auth', request.url);
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access auth, redirect to home
  if (pathname.startsWith('/auth') && session) {
    const url = new URL('/home', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
