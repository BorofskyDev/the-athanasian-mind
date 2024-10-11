// components/Navbar.tsx

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import Link from 'next/link'
import useMobileMenu from '@/lib/hooks/useMobileMenu'
import { menuVariants, navLinkVariants } from '@/lib/utils/animationVariants'
import FocusLock from 'react-focus-lock'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

 const baseNavLinks = [
   'Home',
   'About',
   'Blog',
   'Publications',
   'Resources',
   'Contact',
 ]

const Navbar: React.FC = () => {
  const { isOpen, toggleMenu, firstLinkRef } = useMobileMenu()

  const pathname = usePathname()
  const { user } = useAuth()

  const navLinks = user ? [...baseNavLinks, 'Admin'] : baseNavLinks

  return (
    <nav className='sticky top-0 bg-background max-w-screen-xl mx-auto shadow-lg z-50 md:px-10 lg:px-20 xl:px-30'>
      <div className='flex justify-between items-center p-4 px-5 py-6'>
        <div className='text-primary font-display gradient-text text-xl'>
          tAM
        </div>

        <button
          onClick={toggleMenu}
          aria-label='Toggle Menu'
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
          className='focus:outline-none md:hidden z-50'
        >
          {isOpen ? (
            <FiX size={28} color='#8E44AD' aria-label='Close Menu' />
          ) : (
            <FiMenu size={28} color='#2C2D4E' aria-label='Open Menu' />
          )}
        </button>

        <ul className='hidden md:flex space-x-6'>
          {navLinks.map((link) => {
            const linkPath = link === 'Home' ? '/' : `/${link.toLowerCase()}`
            const isActive = pathname === linkPath

            return (
              <li key={link}>
                <Link
                  href={linkPath}
                  className={`text-lg font-semibold text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded ${
                    isActive ? 'underline decoration-accent' : ''
                  }`}
                >
                  {link}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <AnimatePresence>
        {isOpen && (
          <FocusLock>
            <motion.div
              id='mobile-menu'
              className='fixed top-0 left-0 w-full h-full bg-background flex flex-col items-center justify-center z-40'
              initial='closed'
              animate='open'
              exit='closed'
              variants={menuVariants}
              role='dialog'
              aria-modal='true'
            >
              <motion.ul
                className='space-y-6 text-center'
                initial='closed'
                animate='open'
                exit='closed'
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link}
                    custom={index}
                    variants={navLinkVariants}
                  >
                    <Link
                      href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                      onClick={toggleMenu}
                      className='text-2xl font-semibold text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded'
                      ref={index === 0 ? firstLinkRef : null}
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </FocusLock>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
