'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useIsHydrated } from '@/hooks/useIsHydrated'

const Hero = () => {
  const isHydrated = useIsHydrated()

  const heroFade = (delay = 0) => ({
    initial: { opacity: isHydrated ? 0 : 1, y: isHydrated ? 20 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  })

  const motionKey = (segment: string) => `${isHydrated ? 'hydrated' : 'ssr'}-${segment}`

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-[var(--background)]">
      {/* Subtle gradient overlay - OpenAI style */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface)]/30"></div>
      
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-teal)_0%,_transparent_50%)] opacity-[0.03]"></div>
      
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            key={motionKey('badge')}
            {...heroFade(0.1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-secondary)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-teal)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-teal)]"></span>
            </span>
            Introducing AgentHub
          </motion.div>

          {/* Main heading */}
          <motion.div key={motionKey('heading')} {...heroFade(0.2)} className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] tracking-tight">
              The App Store for{' '}
              <span className="gradient-text">AI Agents</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Transform weeks of AI agent integration into one line of code. 
              Discover, install, and deploy AI agents instantly.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            key={motionKey('cta')}
            {...heroFade(0.3)}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
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
          </motion.div>

          {/* Code example */}
          <motion.div key={motionKey('code')} {...heroFade(0.4)} className="pt-12 max-w-2xl mx-auto">
            <div className="code-block text-left">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">terminal</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-[var(--text-tertiary)]"># Install AgentHub</div>
                <div className="text-[var(--accent-teal)]">$ pip install agenthub-sdk</div>
                <div className="mt-4 text-[var(--text-tertiary)]"># Load and use an agent</div>
                <div className="text-[var(--text-primary)]">
                  <span className="text-[var(--accent-purple)]">import</span> agenthub <span className="text-[var(--accent-purple)]">as</span> ah
                </div>
                <div className="text-[var(--text-primary)]">
                  agent = ah.load_agent(<span className="text-orange-400">&quot;coding-agent&quot;</span>)
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Hero }