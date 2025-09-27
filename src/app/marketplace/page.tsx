'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Search, Filter } from 'lucide-react'
import Link from 'next/link'

const Marketplace = () => {
  const agents = [
    {
      id: 'research-agent',
      name: 'Research Agent',
      description: 'Advanced research and analysis capabilities',
      icon: '🔬',
      rating: 5,
      uses: '1.2k',
      category: 'Research',
      features: ['Web search', 'Data analysis', 'Report generation']
    },
    {
      id: 'coding-agent',
      name: 'Coding Agent',
      description: 'Generate and review code across multiple languages',
      icon: '💻',
      rating: 5,
      uses: '2.1k',
      category: 'Development',
      features: ['Code generation', 'Code review', 'Bug fixing']
    },
    {
      id: 'analysis-agent',
      name: 'Analysis Agent',
      description: 'Data analysis and insights generation',
      icon: '📊',
      rating: 4,
      uses: '856',
      category: 'Data Science',
      features: ['Data visualization', 'Statistical analysis', 'Insights']
    },
    {
      id: 'scientific-paper-analyzer',
      name: 'Scientific Paper Analyzer',
      description: 'Analyze and summarize research papers',
      icon: '📄',
      rating: 5,
      uses: '743',
      category: 'Research',
      features: ['Paper analysis', 'Summary generation', 'Citation tracking']
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

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
            Agent Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Discover and integrate powerful AI agents into your workflow
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
                  {agent.icon}
                </div>
                <span className="text-xs font-medium text-purple-400 bg-purple-400/20 px-3 py-1 rounded-full">
                  {agent.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {agent.name}
              </h3>
              
              <p className="text-white/70 mb-6">
                {agent.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/80 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(agent.rating)}
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {agent.uses} uses
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/agents/${agent.id}`}
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center block"
                >
                  View Details
                </Link>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 border border-white/20">
                  Try Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
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

export default Marketplace
