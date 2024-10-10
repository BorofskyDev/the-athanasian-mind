// app/admin/page.tsx

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import admin from 'firebase-admin'

// Initialize Firebase Admin SDK if not already initialized
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

export default async function AdminPage() {
  const tokenCookie = cookies().get('token')
  const token = tokenCookie?.value

  if (!token) {
    // Redirect to login if no token is found
    redirect('/login')
  }

  try {
    // Verify the token using firebase-admin
    const decodedToken = await admin.auth().verifyIdToken(token)
    // You can use decodedToken to get user info if needed
    console.log('Decoded Token:', decodedToken)
  } catch (error) {
    console.error('Token verification failed:', error)
    // Token is invalid or expired, redirect to login
    redirect('/login')
  }

  // Render the admin page content
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content goes here */}
    </div>
  )
}
