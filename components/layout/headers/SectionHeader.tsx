import React from 'react'

interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={`
        text-primary 
        text-center
        font-semibold 
        text-xl 
        md:text-2xl 
        lg:text-3xl 
        xl:text-4xl 
        leading-snug 
        ${className ? className : ''}
      `}
    >
      {children}
    </h3>
  )
}

export default SectionHeader
