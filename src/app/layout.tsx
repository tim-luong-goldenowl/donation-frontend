import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { cookies } from 'next/headers'
import { createContext } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Donation App'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
    
  const token = cookieStore.get('token')
  const isLogin = token ? true : false

  return (
    <html lang="en">
      <body className={inter.className + ' app-container'}>
        <Header isLogin={isLogin}/>
        <div className='main'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
