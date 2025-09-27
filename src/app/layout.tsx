import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentHub - The App Store for AI Agents',
  description: 'Transform weeks of AI agent integration into one line of code. Discover, install, and use AI agents with one-line simplicity.',
  keywords: ['AI agents', 'machine learning', 'Python', 'automation', 'developer tools'],
  authors: [{ name: 'AgentHub Team' }],
  openGraph: {
    title: 'AgentHub - The App Store for AI Agents',
    description: 'Transform weeks of AI agent integration into one line of code.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHub - The App Store for AI Agents',
    description: 'Transform weeks of AI agent integration into one line of code.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
