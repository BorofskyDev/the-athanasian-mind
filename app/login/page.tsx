// app/login/page.tsx

'use client'

import React, { useState } from 'react'
import InputField from '@/components/ui/InputField'
import ActionButton from '@/components/ui/ActionButton'
import { useAuth } from '@/context/AuthContext'

const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await login(email, password)
      // Redirect handled in AuthContext
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-md shadow-md w-full max-w-md'
      >
        <h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
        {error && (
          <div className='mb-4 text-red-500 text-sm text-center'>{error}</div>
        )}
        <InputField
          label='Email'
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='mt-6'>
          <ActionButton type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </ActionButton>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
