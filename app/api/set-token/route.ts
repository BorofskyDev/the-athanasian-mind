// app/api/set-token/route.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import admin from 'firebase-admin'

// Initialize Firebase Admin SDK with proper type safety
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  )

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials in environment variables.'
    )
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(token)

    // Example usage: Log the user's UID
    console.log('Authenticated user UID:', decodedToken.uid)

    // You can extend this section to include role-based access or other logic
    // For example:
    // if (decodedToken.role !== 'admin') {
    //   throw new Error('Insufficient permissions')
    // }

    // Set token in HTTP-only cookie
    const response = NextResponse.json({ message: 'Token set successfully' })
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        { status: 401 }
      )
    }
  }
}
