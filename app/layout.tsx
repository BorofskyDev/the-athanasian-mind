import type { Metadata } from 'next'
import { Cinzel, PT_Serif, Open_Sans } from 'next/font/google'

import './globals.css'
import Header from '@/components/layout/header/Banner'
import Navbar from '@/components/layout/header/Navbar'
import Footer from '@/components/footer/Footer'
import { AuthProvider } from '@/context/AuthContext'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
})

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'The Athanasian Mind: Iconic Insights into Faith and Philosophy',
  description:
    'Delving deep into the existence of God with Byzantine wisdom. Explore faith and philosophy through accessible yet profound insights.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${cinzel.variable} ${ptSerif.variable} ${openSans.variable} antialiased max-w-screen-xl mx-auto `}
      >
        <AuthProvider>
          <Header />
          <Navbar />
          <div className='max-w-screen-xl mx-auto pt-[60px] pb-[60px]  md:mx-10 lg:mx-20 xl:mx-30'>
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
