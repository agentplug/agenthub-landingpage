'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Code, ArrowLeft, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useAgent } from '@/hooks/useAgent'

const starRatingFromScore = (score: number | null | undefined) => {
  if (score === null || score === undefined || Number.isNaN(score)) {
    return 3
  }
  return Math.max(1, Math.min(5, Math.round(score / 20)))
}

const AgentPage = ({ params }: { params: { slug: string } }) => {
  const { data: agent, loading, error } = useAgent(params.slug)
  const [copied, setCopied] = useState(false)
  const [usageSnippet, setUsageSnippet] = useState<string | null>(null)

  useEffect(() => {
    const fetchReadmeUsage = async () => {
      if (!agent) return

      try {
        const response = await fetch(`/api/agents/${agent.slug}/readme-example`)
        if (!response.ok) {
          return
        }
        const data: { code: string | null } = await response.json()
        if (data.code && data.code.trim()) {
          setUsageSnippet(data.code.trim())
        }
      } catch (err) {
        console.error('Failed to load README usage snippet', err)
      }
    }

    void fetchReadmeUsage()
  }, [agent])

  const renderStars = (score: number | null | undefined) => {
    const rating = starRatingFromScore(score)
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const fallbackExample = agent
    ? `import agenthub as ah

# Load agent from AgentHub
agent = ah.load_agent("${agent.slug}")

# Replace this with the actual call for your use case
result = agent.run({...})
print(result)`
    : ''

  const codeExample = usageSnippet ?? fallbackExample

  const trackUsage = async (action: 'view' | 'try' | 'install') => {
    if (!agent) return
    try {
      await fetch(`/api/agents/${agent.slug}/usage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })
    } catch (err) {
      console.error('Failed to record usage', err)
    }
  }

  const copyCode = () => {
    if (!codeExample) return
    if (navigator?.clipboard?.writeText) {
      void navigator.clipboard.writeText(codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70">Loading agent…</p>
        </div>
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Agent Not Found</h1>
          <p className="text-white/70 mb-8">
            {error ?? 'The requested agent could not be found.'}
          </p>
          <Link href="/marketplace" className="btn-primary">
            Browse All Agents
          </Link>
        </div>
      </div>
    )
  }

  const initialBadge = agent.tags[0]?.charAt(0)?.toUpperCase() ?? agent.name.charAt(0)?.toUpperCase() ?? 'A'
  const formattedUses = agent.usageCount.toLocaleString()

  useEffect(() => {
    if (!agent) return
    void trackUsage('view')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent?.slug])

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </motion.div>

        {/* Agent Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-dark rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl mr-6">
                  {initialBadge}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{agent.name}</h1>
                  <span className="text-sm font-medium text-purple-400 bg-purple-400/20 px-3 py-1 rounded-full">
                    {agent.category ?? 'General'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(agent.aggregateScore)}
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {formattedUses} uses
                </div>
              </div>
            </div>
            <p className="text-xl text-white/80">{agent.description}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {agent.tags.map((tag, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-white/80">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Repository & creator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Repository & Creator</h2>
              <div className="space-y-3 text-white/80">
                <div>
                  <span className="font-semibold">Repository: </span>
                  <Link
                    href={agent.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline break-all"
                  >
                    {agent.repoUrl}
                  </Link>
                </div>
                <div>
                  <span className="font-semibold">Creator (GitHub): </span>
                  <span>{agent.repoOwner}</span>
                </div>
                {agent.evaluationSummaryUrl && (
                  <div>
                    <span className="font-semibold">Evaluation: </span>
                    <Link
                      href={agent.evaluationSummaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline break-all"
                    >
                      View external evaluation
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Code Example */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-dark rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Code Example</h2>
                <button
                  onClick={copyCode}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-black/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white whitespace-pre-wrap">{codeExample}</pre>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Install Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Install Agent</h3>
              <div className="space-y-4">
                <button
                  className="w-full btn-primary flex items-center justify-center"
                  onClick={() => {
                    void trackUsage('install')
                  }}
                >
                  Install Agent
                </button>
              </div>
            </motion.div>

            {/* Quick Install */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Install</h3>
              <div className="bg-black/50 rounded-xl p-4 font-mono text-sm">
                <div className="text-green-400">pip install agenthub-sdk</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentPage
