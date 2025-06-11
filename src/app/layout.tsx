import type { Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Navigation } from "@/components/navigation";
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RBAC FileUpload Thing',
  description: 'created by @harshith',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navigation />
          {children}
          <Toaster/>        
        </body>
      </html>
    </ClerkProvider>
  )
}