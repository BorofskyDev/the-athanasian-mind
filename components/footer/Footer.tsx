// app/components/layout/Footer.tsx

'use client'

import React from 'react'
import FooterNavLink from '@/components/ui/FooterNavLink'
import { useAuth } from '@/context/AuthContext'
import ActionButton from '@/components/ui/ActionButton'

const Footer: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect handled in AuthContext
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Logout failed:', error.message)
      } else {
        console.error('Logout failed: An unexpected error occurred.')
      }
    }
  }

  return (
    <footer
      className='
        max-w-screen-xl 
        mx-auto
        my-16 
        md:mx-10 lg:mx-20 xl:mx-30 
        text-center 
        text-sm 
        text-gray-500
      '
    >
      <p>
        © {new Date().getFullYear()} The Athanasian Mind. All rights reserved.
      </p>
      {user ? (
        <ActionButton onClick={handleLogout} className='mt-2'>
          Logout
        </ActionButton>
      ) : (
        <FooterNavLink href='/login' className='mt-2 block'>
          Login
        </FooterNavLink>
      )}
    </footer>
  )
}

export default Footer
