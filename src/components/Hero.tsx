'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, BookOpen, Play } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center mb-6 overflow-visible">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-emerald-600/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mr-8 animate-pulse-glow">
                <span className="text-white text-4xl">🤖</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold gradient-text glow-text
                            leading-[1.15] lg:leading-[1.2] pt-1 overflow-visible">
                AgentHub
              </h1>
            </div>
            <p className="text-xl lg:text-3xl text-white/80 max-w-4xl mx-auto">
              The <span className="font-semibold gradient-text">&quot;App Store for AI Agents&quot;</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-2xl text-white/70 mb-12 max-w-5xl mx-auto"
          >
            Transform <span className="font-semibold text-red-400">weeks of AI agent integration</span> into{' '}
            <span className="font-bold text-emerald-400">one line of code</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://github.com/agentplug/agenthub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Try AgentHub Free</span>
            </a>
            <Link
              href="/docs"
              className="btn-secondary flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>View Documentation</span>
            </Link>
            <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Hero }