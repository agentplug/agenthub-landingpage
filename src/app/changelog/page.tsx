'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

const Changelog = () => {
  const releases = [
    {
      version: '0.1.3',
      date: '2024-01-15',
      type: 'minor',
      changes: [
        {
          type: 'feature',
          title: 'Added Scientific Paper Analyzer Agent',
          description: 'New agent for analyzing and summarizing research papers'
        },
        {
          type: 'improvement',
          title: 'Enhanced Agent Execution Performance',
          description: 'Improved execution speed by 40% for all agents'
        },
        {
          type: 'fix',
          title: 'Fixed Memory Leak in Long-Running Agents',
          description: 'Resolved memory issues that occurred with extended agent usage'
        }
      ]
    },
    {
      version: '0.1.2',
      date: '2024-01-10',
      type: 'patch',
      changes: [
        {
          type: 'fix',
          title: 'Fixed Installation Issues on Windows',
          description: 'Resolved pip installation problems on Windows systems'
        },
        {
          type: 'improvement',
          title: 'Better Error Messages',
          description: 'More descriptive error messages for common issues'
        }
      ]
    },
    {
      version: '0.1.1',
      date: '2024-01-05',
      type: 'patch',
      changes: [
        {
          type: 'feature',
          title: 'Added Research Agent',
          description: 'New agent for web research and data analysis'
        },
        {
          type: 'feature',
          title: 'Added Analysis Agent',
          description: 'New agent for data visualization and insights'
        },
        {
          type: 'improvement',
          title: 'Enhanced Documentation',
          description: 'Updated API documentation with more examples'
        }
      ]
    },
    {
      version: '0.1.0',
      date: '2024-01-01',
      type: 'major',
      changes: [
        {
          type: 'feature',
          title: 'Initial Release',
          description: 'First public release of AgentHub with core functionality'
        },
        {
          type: 'feature',
          title: 'Coding Agent',
          description: 'Agent for code generation and review across multiple languages'
        },
        {
          type: 'feature',
          title: 'Agent Marketplace',
          description: 'Platform for discovering and installing AI agents'
        }
      ]
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'text-emerald-400 bg-emerald-400/20'
      case 'improvement':
        return 'text-blue-400 bg-blue-400/20'
      case 'fix':
        return 'text-yellow-400 bg-yellow-400/20'
      case 'major':
        return 'text-purple-400 bg-purple-400/20'
      case 'minor':
        return 'text-blue-400 bg-blue-400/20'
      case 'patch':
        return 'text-gray-400 bg-gray-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Changelog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Track the latest updates and improvements to AgentHub
          </motion.p>
        </div>

        {/* Releases */}
        <div className="space-y-8">
          {releases.map((release, index) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark rounded-2xl p-8"
            >
              {/* Release Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-white mr-4">v{release.version}</h2>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(release.type)}`}>
                    {release.type}
                  </span>
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {release.date}
                </div>
              </div>

              {/* Changes */}
              <div className="space-y-4">
                {release.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="flex items-start">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full mr-4 mt-1 ${getTypeColor(change.type)}`}>
                      {change.type}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{change.title}</h3>
                      <p className="text-white/70 text-sm">{change.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-6">
              Get notified about new releases and important updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Subscribe to Updates
              </button>
              <button className="btn-secondary">
                RSS Feed
              </button>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <a
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Changelog
