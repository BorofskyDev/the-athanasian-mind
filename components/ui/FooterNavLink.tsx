'use client'

import React from 'react'
import Link from 'next/link'

interface FooterNavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <Link
      href={href}
      className={`text-gray-500 hover:text-primary transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}

export default FooterNavLink
