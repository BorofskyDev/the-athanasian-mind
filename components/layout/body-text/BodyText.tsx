'use client'

import React from 'react'

interface BodyTextProps {
  children: React.ReactNode
  className?: string
}

const BodyText: React.FC<BodyTextProps> = ({ children, className }) => {
  return (
    <p
      className={`
        font-body 
        text-base 
        md:text-lg 
        max-w-[844px] 
        mx-auto 
        leading-relaxed 
        ${className ? className : ''}
      `}
    >
      {children}
    </p>
  )
}

export default BodyText
