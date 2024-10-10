import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer
      className='
      max-w-screen-xl 
      mx-auto
        my-[60px] 
        md:mx-10 lg:mx-20 xl:mx-30 
        text-center 
        text-sm 
        text-gray-500
      '
    >
      © {new Date().getFullYear()} The Athanasian Mind. All rights reserved.
    </footer>
  )
}

export default Footer
