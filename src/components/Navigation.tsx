'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const { data: session, status } = useSession()

  const user = session?.user
  const isAuthenticated = status === 'authenticated' && Boolean(user)

  const mainNavItems = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Publish', href: '/publish' },
  ]

  const moreNavItems = [
    { name: 'Security', href: '/security' },
    { name: 'Status', href: '/status' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">A</span>
            </div>
            <span className="font-semibold text-lg text-[var(--text-primary)]">AgentHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[var(--surface)] rounded-lg shadow-xl border border-[var(--border)] py-1"
                  >
                    {moreNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.githubAvatar ? (
                  <Image
                    src={user.githubAvatar}
                    alt={user.githubUsername ?? user.name ?? 'User avatar'}
                    width={32}
                    height={32}
                    className="rounded-full border border-[var(--border)]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--text-secondary)]">
                    {(user?.githubUsername ?? user?.name ?? 'User').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-[var(--text-tertiary)]">Welcome</span>
                  <span className="text-sm text-[var(--text-primary)] font-semibold">
                    {user?.githubUsername ?? user?.name ?? 'Agent'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-secondary text-sm px-3 py-2"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium px-3 py-2"
                >
                  Log in
                </Link>
                <Link href="/docs" className="btn-primary text-sm">
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors duration-200 text-[var(--text-primary)]"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--surface)] border-t border-[var(--border)]"
          >
            <div className="px-6 py-4 space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] rounded-lg transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {moreNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] rounded-lg transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-[var(--border)] space-y-3 mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3">
                      {user?.githubAvatar ? (
                        <Image
                          src={user.githubAvatar}
                          alt={user.githubUsername ?? user?.name ?? 'User avatar'}
                          width={32}
                          height={32}
                          className="rounded-full border border-[var(--border)]"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--text-secondary)]">
                          {(user?.githubUsername ?? user?.name ?? 'User').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-[var(--text-primary)] font-semibold">
                          {user?.githubUsername ?? user?.name ?? 'Agent'}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">Signed in</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary w-full text-sm"
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut()
                      }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] rounded-lg transition-colors duration-200 text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/docs"
                      className="btn-primary block text-center text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export { Navigation }
