'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const AgentMarketplace = () => {
  const agents = [
    {
      id: 'agentplug/coding-agent',
      name: 'Coding Agent',
      description: 'Generate and review code',
      icon: '🤖',
      rating: 5,
      uses: '1.2k',
      category: 'Development'
    },
    {
      id: 'agentplug/analysis-agent',
      name: 'Data Analysis Agent',
      description: 'Analyze data and insights',
      icon: '📊',
      rating: 4,
      uses: '856',
      category: 'Data Science'
    },
    {
      id: 'agentplug/scientific-paper-analyzer',
      name: 'Paper Analyzer',
      description: 'Analyze research papers',
      icon: '📄',
      rating: 5,
      uses: '743',
      category: 'Research'
    },
    {
      id: 'agentplug/web-search',
      name: 'Web Search Agent',
      description: 'Search and scrape web content',
      icon: '🔍',
      rating: 4,
      uses: '634',
      category: 'Web'
    },
    {
      id: 'agentplug/email-assistant',
      name: 'Email Assistant',
      description: 'Smart email management',
      icon: '📧',
      rating: 5,
      uses: '1.5k',
      category: 'Productivity'
    },
    {
      id: 'agentplug/design-helper',
      name: 'Design Helper',
      description: 'Generate designs and mockups',
      icon: '🎨',
      rating: 4,
      uses: '421',
      category: 'Design'
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Popular Agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover powerful AI agents ready to integrate into your workflow
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  {agent.icon}
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {agent.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {agent.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {agent.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(agent.rating)}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {agent.uses} uses
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                  Try Now
                </button>
                <Link
                  href={`/agents/${agent.id}`}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to explore more agents?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse our full marketplace with hundreds of AI agents across different categories and use cases.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <span>Browse All Agents</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export { AgentMarketplace }
