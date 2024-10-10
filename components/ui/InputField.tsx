

'use client'

import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className='mb-1 text-sm font-medium text-gray-700'
        >
          {label}
        </label>
      )}
      <input
        className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
        {...props}
      />
    </div>
  )
}

export default InputField
