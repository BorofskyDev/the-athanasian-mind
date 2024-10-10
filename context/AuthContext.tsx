// app/context/AuthContext.tsx

'use client'

import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react'
import { auth } from '@/lib/firebase' // Ensure correct path
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Authenticate with Firebase Auth client-side
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      if (user) {
        // Get the ID token
        const token = await user.getIdToken()
        // Send the token to the server to set the cookie
        const response = await fetch('/api/set-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to set token')
        }

        // Redirect to admin page
        router.push('/admin')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('An unexpected error occurred.')
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      // Clear the token cookie via API route
      await fetch('/api/logout', {
        method: 'POST',
      })
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('An unexpected error occurred.')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy access to AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
