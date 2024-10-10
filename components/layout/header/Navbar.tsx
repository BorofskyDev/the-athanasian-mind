'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi' // Hamburger and X icons
import Link from 'next/link'

const navLinks = [
  'Home',
  'About',
  'Blog',
  'Publications',
  'Resources',
  'Contact',
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Toggle the menu open state
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close the menu when pressing the Esc key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  // Shift focus to the first link when the menu opens
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  // Variants for the mobile menu container
  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      x: '0%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

  // Variants for the nav links
  const navLinkVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, // 0.1s delay between each link
        duration: 0.3,
        ease: 'easeInOut',
      },
    }),
  }

  return (
    <nav className='sticky top-0 bg-background max-w-screen-xl mx-auto shadow-lg z-50 md:px-10 lg:px-20 xl:px-30'>
      <div className='flex justify-between items-center p-4  px-5  py-6'>
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
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className='text-lg font-semibold text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded'
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {isOpen && (
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
                <motion.li key={link} custom={index} variants={navLinkVariants}>
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
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
