'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[var(--background)] to-[var(--surface)]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Transform your AI workflow in seconds. Free and open source.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/agentplug/agenthub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/docs"
              className="btn-secondary flex items-center gap-2 min-w-[200px] justify-center"
            >
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </Link>
          </div>

          <div className="pt-8">
            <div className="inline-block card max-w-xl w-full">
              <div className="text-[var(--text-tertiary)] text-sm mb-3 text-left">
                Quick install:
              </div>
              <div className="code-block text-left">
                <div className="text-[var(--accent-teal)]">
                  $ pip install agenthub-sdk
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-sm text-[var(--text-tertiary)]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full"></span>
              Free
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full"></span>
              Open Source
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full"></span>
              MIT License
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { CTA }
