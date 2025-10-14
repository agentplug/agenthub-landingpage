'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const AgentMarketplace = () => {
  const agents = [
    {
      id: 'research-agent',
      name: 'Research Agent',
      description: 'Advanced research and analysis with comprehensive information gathering',
      icon: '🔬',
      rating: 5,
      uses: '1.2k',
      category: 'Research'
    },
    {
      id: 'coding-agent',
      name: 'Coding Agent',
      description: 'Generate and review code across multiple programming languages',
      icon: '💻',
      rating: 5,
      uses: '2.1k',
      category: 'Development'
    },
    {
      id: 'analysis-agent',
      name: 'Analysis Agent',
      description: 'Data analysis and insights generation with visualization',
      icon: '📊',
      rating: 4,
      uses: '856',
      category: 'Data Science'
    },
    {
      id: 'scientific-paper-analyzer',
      name: 'Scientific Paper Analyzer',
      description: 'Analyze and summarize research papers with citation tracking',
      icon: '📄',
      rating: 5,
      uses: '743',
      category: 'Research'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-[var(--accent-teal)] fill-[var(--accent-teal)]' : 'text-[var(--text-tertiary)]'
        }`}
      />
    ))
  }

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight"
          >
            Popular Agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Discover powerful AI agents ready to integrate into your workflow
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[var(--surface-hover)] rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-xs text-[var(--text-tertiary)] px-2 py-0.5 bg-[var(--surface-hover)] rounded-full">
                      {agent.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                {agent.description}
              </p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-1">
                  {renderStars(agent.rating)}
                </div>
                <div className="flex items-center gap-1 text-[var(--text-tertiary)] text-sm">
                  <Users className="w-4 h-4" />
                  {agent.uses} uses
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary flex-1 text-sm">
                  Try Now
                </button>
                <Link
                  href={`/agents/${agent.id}`}
                  className="btn-secondary flex-1 text-sm text-center"
                >
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            <span>Browse all agents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export { AgentMarketplace }
