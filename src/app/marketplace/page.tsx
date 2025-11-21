
'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Search, Filter, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAgents } from '@/hooks/useAgents'
import type { AgentListItem } from '@/lib/api/agents'

const starRatingFromScore = (score: number | null) => {
  if (score === null || Number.isNaN(score)) {
    return 3
  }
  return Math.max(1, Math.min(5, Math.round(score / 20)))
}

const Marketplace = () => {
  const { data, loading, error } = useAgents({ limit: 50 })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAgents = useMemo(() => {
    const agents = data?.agents ?? []
    if (!searchTerm) {
      return agents
    }
    const term = searchTerm.toLowerCase()
    return agents.filter((agent) =>
      agent.name.toLowerCase().includes(term) ||
      agent.description.toLowerCase().includes(term) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(term))
    )
  }, [data, searchTerm])

  const renderStars = (score: number | null) => {
    const rating = starRatingFromScore(score)
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-[var(--accent-teal)] fill-current' : 'text-[var(--text-tertiary)]'}`}
      />
    ))
  }

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
            Agent Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)] w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-teal)] transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Agents Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-teal)]" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)]">{error}</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)]">No agents match your search yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredAgents.map((agent, index) => {
              const cardBadge = agent.tags[0]?.charAt(0)?.toUpperCase() ?? agent.name.charAt(0)?.toUpperCase() ?? 'A'

              return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="card card-glow group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-blue)] rounded-lg flex items-center justify-center text-3xl shadow-lg">
                  {cardBadge}
                </div>
                <span className="text-xs font-medium text-[var(--accent-teal)] bg-[var(--accent-teal-light)] px-3 py-1 rounded-full">
                  {agent.category ?? 'General'}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                {agent.name}
              </h3>
              
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {agent.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[var(--surface-hover)] text-[var(--text-secondary)] px-2 py-1 rounded border border-[var(--border)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border)]">
                <div className="flex items-center space-x-1">
                  {renderStars(agent.aggregateScore)}
                </div>
                <div className="flex items-center text-[var(--text-tertiary)] text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {agent.usageCount.toLocaleString()} uses
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/agents/${agent.slug}`}
                  className="btn-primary w-full text-center block"
                >
                  View Details
                </Link>
                <button className="btn-secondary w-full">
                  Try Now
                </button>
              </div>
            </motion.div>
              )
            })}
          </div>
        )}

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
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

export default Marketplace
