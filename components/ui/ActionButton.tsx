'use client'

import React from 'react'

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-primary text-background px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default ActionButton
