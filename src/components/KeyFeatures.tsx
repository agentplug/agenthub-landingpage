'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Zap, Wrench, Lock, Download, Terminal } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Agent Marketplace',
    description: 'Browse hundreds of pre-built AI agents ready to use instantly',
  },
  {
    icon: Zap,
    title: 'One-Line Integration',
    description: 'Load any agent with a single line of code - no setup required',
  },
  {
    icon: Wrench,
    title: 'Custom Tools',
    description: 'Extend agents with your own tools using simple decorators',
  },
  {
    icon: Lock,
    title: 'Isolated Environments',
    description: 'Each agent runs in its own virtual environment - zero conflicts',
  },
  {
    icon: Download,
    title: 'Auto-Installation',
    description: 'Agents install automatically when needed - just works',
  },
  {
    icon: Terminal,
    title: 'CLI Interface',
    description: 'Full command-line management for automation workflows',
  },
]

const KeyFeatures = () => {
  return (
    <section className="py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Powerful features that make AI agent integration effortless
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="card group"
              >
                <div className="w-10 h-10 bg-[var(--accent-teal-light)] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--accent-teal)] transition-colors duration-200">
                  <IconComponent className="w-5 h-5 text-[var(--accent-teal)] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Code example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 card max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Extend agents with custom tools
          </h3>
          
          <div className="code-block">
            <div className="space-y-2 text-sm">
              <div className="text-[var(--text-tertiary)]"># Define custom tools</div>
              <div>
                <span className="text-[var(--accent-purple)]">from</span>{' '}
                <span className="text-[var(--text-primary)]">agentplug.core.tools</span>{' '}
                <span className="text-[var(--accent-purple)]">import</span>{' '}
                <span className="text-[var(--text-primary)]">tool</span>
              </div>
              <div className="h-2"></div>
              <div>
                <span className="text-[var(--accent-blue)]">@tool</span>
                (name=<span className="text-orange-400">&quot;web_search&quot;</span>, description=
                <span className="text-orange-400">&quot;Search the web&quot;</span>)
              </div>
              <div>
                <span className="text-[var(--accent-purple)]">def</span>{' '}
                <span className="text-[var(--accent-teal)]">web_search</span>(query: 
                <span className="text-[var(--accent-blue)]">str</span>) → 
                <span className="text-[var(--accent-blue)]">list</span>:
              </div>
              <div className="pl-4 text-[var(--text-tertiary)]">
                &quot;&quot;&quot;Search the web and return results.&quot;&quot;&quot;
              </div>
              <div className="pl-4 text-[var(--text-tertiary)]">
                # Your implementation here
              </div>
              <div className="pl-4">
                <span className="text-[var(--accent-purple)]">return</span>{' '}
                <span className="text-[var(--text-primary)]">results</span>
              </div>
              <div className="h-2"></div>
              <div className="text-[var(--text-tertiary)]"># Use with agents</div>
              <div>
                <span className="text-[var(--accent-purple)]">import</span>{' '}
                <span className="text-[var(--text-primary)]">agenthub</span>{' '}
                <span className="text-[var(--accent-purple)]">as</span>{' '}
                <span className="text-[var(--text-primary)]">ah</span>
              </div>
              <div>
                <span className="text-[var(--text-primary)]">agent</span> = 
                <span className="text-[var(--text-primary)]"> ah</span>.
                <span className="text-[var(--accent-teal)]">load_agent</span>(
                <span className="text-orange-400">&quot;analysis-agent&quot;</span>, 
                tools=[<span className="text-orange-400">&quot;web_search&quot;</span>])
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { KeyFeatures }
