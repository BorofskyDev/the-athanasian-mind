import React from 'react'

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, className }) => {
  return (
    <h2
      className={`
        text-gradient 
        text-center 
        font-display 
        text-2xl 
        md:text-3xl 
        lg:text-4xl 
        xl:text-5xl 
        leading-tight 
        ${className ? className : ''}
      `}
    >
      {children}
    </h2>
  )
}

export default PageHeader
