'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Code, Play, ArrowLeft, Copy, Check } from 'lucide-react'
import Link from 'next/link'

const AgentPage = ({ params }: { params: { slug: string } }) => {
  const [copied, setCopied] = useState(false)

  const agents = {
    'research-agent': {
      name: 'Research Agent',
      description: 'Advanced research and analysis capabilities for comprehensive information gathering and synthesis.',
      icon: '🔬',
      rating: 5,
      uses: '1.2k',
      category: 'Research',
      features: ['Web search', 'Data analysis', 'Report generation', 'Citation tracking'],
      useCases: ['Academic research', 'Market analysis', 'Competitive intelligence', 'Content creation'],
      codeExample: `import agenthub as ah

# Load research agent
research_agent = ah.load_agent("research-agent")

# Research a topic
results = research_agent.research(
    topic="artificial intelligence trends 2024",
    depth="comprehensive",
    sources=["academic", "industry", "news"]
)

# Generate report
report = research_agent.generate_report(results)
print(report.summary)`
    },
    'coding-agent': {
      name: 'Coding Agent',
      description: 'Generate and review code across multiple programming languages with intelligent suggestions.',
      icon: '💻',
      rating: 5,
      uses: '2.1k',
      category: 'Development',
      features: ['Code generation', 'Code review', 'Bug fixing', 'Documentation'],
      useCases: ['Rapid prototyping', 'Code optimization', 'Bug resolution', 'Learning assistance'],
      codeExample: `import agenthub as ah

# Load coding agent
coding_agent = ah.load_agent("coding-agent")

# Generate code
code = coding_agent.generate_code(
    prompt="React component for data table with sorting",
    language="javascript",
    framework="react"
)

# Review code
review = coding_agent.review_code(code)
print(review.suggestions)`
    },
    'analysis-agent': {
      name: 'Analysis Agent',
      description: 'Data analysis and insights generation with advanced statistical and visualization capabilities.',
      icon: '📊',
      rating: 4,
      uses: '856',
      category: 'Data Science',
      features: ['Data visualization', 'Statistical analysis', 'Insights', 'Predictive modeling'],
      useCases: ['Business intelligence', 'Data exploration', 'Performance analysis', 'Trend identification'],
      codeExample: `import agenthub as ah

# Load analysis agent
analysis_agent = ah.load_agent("analysis-agent")

# Analyze data
results = analysis_agent.analyze(
    data="sales_data.csv",
    analysis_type="comprehensive",
    visualizations=True
)

# Get insights
insights = analysis_agent.get_insights(results)
print(insights.summary)`
    },
    'scientific-paper-analyzer': {
      name: 'Scientific Paper Analyzer',
      description: 'Analyze and summarize research papers with citation tracking and methodology extraction.',
      icon: '📄',
      rating: 5,
      uses: '743',
      category: 'Research',
      features: ['Paper analysis', 'Summary generation', 'Citation tracking', 'Methodology extraction'],
      useCases: ['Literature review', 'Research synthesis', 'Academic writing', 'Knowledge discovery'],
      codeExample: `import agenthub as ah

# Load paper analyzer
paper_analyzer = ah.load_agent("scientific-paper-analyzer")

# Analyze paper
analysis = paper_analyzer.analyze_paper(
    paper_path="research_paper.pdf",
    analysis_depth="comprehensive"
)

# Get summary
summary = paper_analyzer.get_summary(analysis)
print(summary.key_findings)`
    }
  }

  const agent = agents[params.slug as keyof typeof agents]

  if (!agent) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Agent Not Found</h1>
          <p className="text-white/70 mb-8">The requested agent could not be found.</p>
          <Link href="/marketplace" className="btn-primary">
            Browse All Agents
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const copyCode = () => {
    navigator.clipboard.writeText(agent.codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-4xl mr-6">
                  {agent.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{agent.name}</h1>
                  <span className="text-sm font-medium text-purple-400 bg-purple-400/20 px-3 py-1 rounded-full">
                    {agent.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(agent.rating)}
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {agent.uses} uses
                </div>
              </div>
            </div>
            <p className="text-xl text-white/80">{agent.description}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {agent.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {agent.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-white/80">{useCase}</span>
                  </div>
                ))}
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
                <pre className="text-white whitespace-pre-wrap">{agent.codeExample}</pre>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Try Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glass-dark rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Try This Agent</h3>
              <div className="space-y-4">
                <button className="w-full btn-primary flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Try in Playground
                </button>
                <button className="w-full btn-secondary">
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
