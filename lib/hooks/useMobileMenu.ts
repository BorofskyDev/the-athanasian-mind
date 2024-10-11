import { useState, useEffect, useRef } from 'react'

interface UseMobileMenuReturn {
  isOpen: boolean
  toggleMenu: () => void
  firstLinkRef: React.RefObject<HTMLAnchorElement>
}

const useMobileMenu = (): UseMobileMenuReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  return { isOpen, toggleMenu, firstLinkRef }
}

export default useMobileMenu
