'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code, Play, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Docs = () => {
  const sections = [
    {
      title: 'Quick Start',
      description: 'Get up and running with AgentHub in minutes',
      icon: <Play className="w-6 h-6" />,
      href: '/docs/quickstart'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      icon: <Code className="w-6 h-6" />,
      href: '/docs/api'
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides and best practices',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/docs/tutorials'
    },
    {
      title: 'Examples',
      description: 'Real-world usage examples and code samples',
      icon: <Download className="w-6 h-6" />,
      href: '/docs/examples'
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight"
          >
            Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Everything you need to integrate AI agents into your workflow
          </motion.p>
        </div>

        {/* Quick Install */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Quick Install</h2>
            <div className="code-block">
              <div className="text-[var(--accent-teal)]">$ pip install agenthub-sdk</div>
            </div>
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="card group hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-blue)] rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{section.title}</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{section.description}</p>
              <Link
                href={section.href}
                className="inline-flex items-center text-[var(--accent-teal)] hover:text-[var(--accent-teal-hover)] transition-colors font-medium"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Basic Usage</h2>
            <div className="code-block overflow-x-auto">
              <div className="text-[var(--text-tertiary)] mb-4"># Load and use an agent</div>
              <div className="space-y-2 text-[var(--text-primary)]">
                <div><span className="text-[var(--accent-purple)]">import</span> agenthub <span className="text-[var(--accent-purple)]">as</span> ah</div>
                <div></div>
                <div><span className="text-[var(--text-tertiary)]"># Load a coding agent</span></div>
                <div>agent = <span className="text-[var(--text-primary)]">ah</span>.<span className="text-[var(--accent-teal)]">load_agent</span>(<span className="text-orange-400">&quot;coding-agent&quot;</span>)</div>
                <div></div>
                <div><span className="text-[var(--text-tertiary)]"># Generate code</span></div>
                <div>code = agent.<span className="text-[var(--accent-teal)]">generate_code</span>(<span className="text-orange-400">&quot;React component for data table&quot;</span>)</div>
                <div><span className="text-[var(--accent-blue)]">print</span>(code)</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Docs
