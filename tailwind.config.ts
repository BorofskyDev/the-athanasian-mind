import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F4F4',
        text: '#18171A',
        primary: '#2C2D4E',
        secondary: '#8E44AD',
        accent: '#3498DB',

        'dark-background': '#22223B',
        'dark-text': '#EAEAEA',
        'dark-primary': '#B7ACEC',
        'dark-secondary': '#F39C12',
        'dark-accent': '#F66565',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        header: ['var(--font-pt-serif)', 'serif'],
        body: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Custom Gradient Text Plugin
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-gradient': {
          backgroundImage: `linear-gradient(45deg, ${theme(
            'colors.primary'
          )}, ${theme('colors.secondary')})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        },
      }

      addUtilities(newUtilities, {
        respectPrefix: false,
        respectImportant: false,
      })
    }),
  ],
}
export default config
