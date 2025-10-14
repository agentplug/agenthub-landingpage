'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Code, DollarSign, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Publish = () => {
  const steps = [
    {
      number: 1,
      title: 'Create Your Agent',
      description: 'Build your AI agent using our SDK and tools',
      icon: <Code className="w-6 h-6" />
    },
    {
      number: 2,
      title: 'Test & Validate',
      description: 'Ensure your agent works correctly and meets quality standards',
      icon: <Upload className="w-6 h-6" />
    },
    {
      number: 3,
      title: 'Publish to Marketplace',
      description: 'Submit your agent for review and publication',
      icon: <Users className="w-6 h-6" />
    },
    {
      number: 4,
      title: 'Earn Revenue',
      description: 'Receive 70% of revenue from agent usage',
      icon: <DollarSign className="w-6 h-6" />
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
            Publish Your Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Share your AI agents with the world and earn revenue from their usage
          </motion.p>
        </div>

        {/* Revenue Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="card max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4">Revenue Sharing</h2>
              <p className="text-[var(--text-secondary)]">Earn 70% of revenue from your agent usage</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--accent-teal)] mb-2">70%</div>
                <div className="text-[var(--text-secondary)]">You Earn</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--accent-purple)] mb-2">20%</div>
                <div className="text-[var(--text-secondary)]">Platform Fee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--accent-blue)] mb-2">10%</div>
                <div className="text-[var(--text-secondary)]">Infrastructure</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Publishing Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] text-center mb-12">How to Publish</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-blue)] rounded-lg flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-[var(--accent-teal)] mb-2">Step {step.number}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Agent Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Technical Requirements</h3>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>• Python 3.11+ compatibility</li>
                  <li>• Proper error handling</li>
                  <li>• Clear documentation</li>
                  <li>• Unit tests included</li>
                  <li>• Performance benchmarks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quality Standards</h3>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>• Clear purpose and use cases</li>
                  <li>• Reliable and consistent output</li>
                  <li>• Security best practices</li>
                  <li>• Resource efficiency</li>
                  <li>• User-friendly interface</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mb-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Ready to Publish?</h2>
            <p className="text-[var(--text-secondary)] mb-6">Start building and publishing your AI agents today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="btn-primary flex items-center justify-center"
              >
                <Code className="w-5 h-5 mr-2" />
                View Documentation
              </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
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

export default Publish
