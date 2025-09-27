'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, BookOpen } from 'lucide-react'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Transform your AI workflow in 30 seconds
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/docs"
              className="bg-white text-purple-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Install AgentHub</span>
            </Link>
            
            <Link
              href="/docs"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Documentation</span>
            </Link>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <div className="text-purple-100 text-sm mb-2">Quick Install:</div>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-white text-left">
              <div className="text-green-400">pip install agenthub-sdk</div>
            </div>
          </div>

          <div className="mt-8 text-purple-100 text-sm">
            <span className="font-semibold">Free</span> • <span className="font-semibold">Open Source</span> • <span className="font-semibold">MIT License</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { CTA }
