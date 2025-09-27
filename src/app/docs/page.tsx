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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
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
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Install</h2>
            <div className="bg-black/50 rounded-xl p-4 font-mono text-sm">
              <div className="text-green-400">pip install agenthub-sdk</div>
            </div>
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4 text-white">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-white/70 mb-6">{section.description}</p>
              <Link
                href={section.href}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
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
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Basic Usage</h2>
            <div className="bg-black/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-400 mb-4"># Load and use an agent</div>
              <div className="space-y-2 text-white">
                <div><span className="text-blue-400">import</span> agenthub <span className="text-blue-400">as</span> ah</div>
                <div></div>
                <div><span className="text-gray-400"># Load a coding agent</span></div>
                <div>agent = <span className="text-yellow-400">ah</span>.<span className="text-blue-400">load_agent</span>(<span className="text-green-400">"coding-agent"</span>)</div>
                <div></div>
                <div><span className="text-gray-400"># Generate code</span></div>
                <div>code = agent.<span className="text-blue-400">generate_code</span>(<span className="text-green-400">"React component for data table"</span>)</div>
                <div><span className="text-blue-400">print</span>(code)</div>
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
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Docs
