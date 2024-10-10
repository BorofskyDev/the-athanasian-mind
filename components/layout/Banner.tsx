'use client'
import React from 'react'

const Banner: React.FC = () => {
  return (
    <div
      className='
      max-w-screen-xl
      mx-auto
        my-[60px]         
        md:mx-10 lg:mx-20 xl:mx-30 
      '
    >
      <h1
        className='
        font-display 
        text-center 
        text-[clamp(2rem,5vw,4rem)] 
        leading-tight 
        text-primary
      '
      >
        The Athanasian Mind
      </h1>
    </div>
  )
}

export default Banner
