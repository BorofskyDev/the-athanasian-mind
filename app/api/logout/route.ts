// app/api/logout/route.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  // Renamed 'req' to '_req'
  const response = NextResponse.json({ message: 'Logout successful' })

  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: -1, // Expire the cookie
  })

  return response
}
