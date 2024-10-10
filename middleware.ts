// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Define protected routes
  const protectedRoutes = ['/admin']

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const tokenCookie = req.cookies.get('token')
    const token = tokenCookie?.value

    if (!token) {
      // Redirect to login if no token is found
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Optionally, add basic token format validation here
    // Avoid using any Node.js-specific modules or complex logic
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
