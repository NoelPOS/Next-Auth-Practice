import AuthProvider from '@/components/Provider'
import './globals.css'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Authentication',
  description: 'Next.js authentication with NextAuth.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
