export const menuVariants = {
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

export const navLinkVariants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeInOut',
    },
  }),
}
