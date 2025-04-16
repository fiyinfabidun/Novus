import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('auth_token')?.value;
  
  // Check if user is trying to access protected routes
  if (
    !authToken && 
    (request.nextUrl.pathname.startsWith('/products') ||
     request.nextUrl.pathname.startsWith('/cart') ||
     request.nextUrl.pathname.startsWith('/profile'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is authenticated and trying to access login page, redirect to home
  if (authToken && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/products/:path*', '/cart/:path*', '/profile/:path*'],
};