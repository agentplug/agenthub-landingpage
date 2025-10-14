import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">A</span>
              </div>
              <span className="font-semibold text-lg text-[var(--text-primary)]">AgentHub</span>
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm mb-6 leading-relaxed">
              Making AI agents as easy as pip install.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/agentplug/agenthub"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/agenthub"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:agenthub@agentplug.net"
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-sm">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  CLI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-sm">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Discord
                </Link>
              </li>
              <li>
                <a href="https://github.com/agentplug/agenthub" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/agenthub" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-sm">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[var(--text-tertiary)] text-sm">
              © 2024 AgentHub. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <span>MIT License</span>
              <Link href="/changelog" className="hover:text-[var(--text-primary)] transition-colors duration-200">
                Changelog
              </Link>
              <Link href="/status" className="hover:text-[var(--text-primary)] transition-colors duration-200">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
