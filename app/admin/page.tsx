// app/admin/page.tsx

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import admin from 'firebase-admin'
import AdminPageComponent from '@/components/admin/AdminPageComponent'

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

// Server Component
const AdminPage: React.FC = () => {
  // Access cookies on the server
  const token = cookies().get('token')?.value

  if (!token) {
    // Redirect to login if no token is found
    redirect('/login')
  }

  // Optionally, verify the token here using Firebase Admin SDK
  // This ensures that the token is valid and the user is authenticated
  try {
    admin.auth().verifyIdToken(token)
  } catch (error) {
    console.error('Token verification failed:', error)
    // Redirect to login if token is invalid
    redirect('/login')
  }

  return <AdminPageComponent /> // Render the Client Component
}

export default AdminPage
