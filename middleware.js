// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './utils/auth';  // Make sure the path is correct

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('access_token');

    // Redirect unauthenticated users
    if (!token && pathname !== '/auth/login' && pathname !== '/auth/register') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Redirect authenticated users from auth pages
    if (token && (pathname === '/auth/login' || pathname === '/auth/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow requests to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/about',
        '/admin',
        '/services/upload',
        '/auth/:path*'
    ],
};
