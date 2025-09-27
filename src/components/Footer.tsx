'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Agents', href: '/marketplace' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Features', href: '/features' },
        { name: 'CLI', href: '/docs' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: '/contact' },
        { name: 'GitHub', href: 'https://github.com/agentplug/agenthub' },
        { name: 'Twitter', href: 'https://twitter.com/agenthub' },
        { name: 'Email', href: 'mailto:agenthub@agentplug.net' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Status', href: '/status' },
        { name: 'Security', href: '/security' },
        { name: 'FAQ', href: '/docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/agentplug/agenthub', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/agenthub', label: 'Twitter' },
    { icon: Mail, href: 'mailto:agenthub@agentplug.net', label: 'Email' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <span className="font-bold text-xl">AgentHub</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Making AI agents as easy as pip install. One line. Infinite possibilities.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 AgentHub. Making AI agents as easy as pip install.
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">License MIT</span>
              <Link href="/changelog" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Changelog
              </Link>
              <Link href="/status" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
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
