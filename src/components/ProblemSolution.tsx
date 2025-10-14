'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, Copy, Check } from 'lucide-react'

const ProblemSolution = () => {
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const copyToClipboard = (text: string, setCopied: (value: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const installCommand = 'pip install agenthub-sdk'
  const pythonCode = `import agenthub as ah
coding_agent = ah.load_agent("agentplug/coding-agent")
code = coding_agent.generate_code("neural network class")`

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
            Before vs After AgentHub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Transform weeks of complex integration into seconds
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Before AgentHub */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Before AgentHub</h3>
                <p className="text-sm text-red-400">2-4 weeks of setup</p>
              </div>
            </div>

            <div className="bg-[var(--background)] rounded-lg p-6 font-mono text-sm space-y-2 text-[var(--text-secondary)]">
              <div>1. Find agent on GitHub</div>
              <div>2. Clone repository</div>
              <div>3. Read documentation</div>
              <div>4. Install dependencies</div>
              <div>5. Configure environment</div>
              <div>6. Debug integration issues</div>
              <div>7. Write wrapper code</div>
              <div>8. Test and validate</div>
              <div className="pt-4 border-t border-[var(--border)] text-red-400 font-semibold">
                ⏱️ Result: 2-4 weeks
              </div>
            </div>
          </motion.div>

          {/* With AgentHub */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card border-[var(--accent-teal)]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--accent-teal-light)] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[var(--accent-teal)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">With AgentHub</h3>
                <p className="text-sm text-[var(--accent-teal)]">30 seconds</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Install command */}
              <div className="bg-[var(--background)] rounded-lg p-4 font-mono text-sm relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--accent-teal)]">{installCommand}</span>
                  <button 
                    onClick={() => copyToClipboard(installCommand, setCopiedInstall)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                  >
                    {copiedInstall ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Python code */}
              <div className="bg-[var(--background)] rounded-lg p-6 font-mono text-sm relative group">
                <button 
                  onClick={() => copyToClipboard(pythonCode, setCopiedCode)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="space-y-2 text-[var(--text-primary)]">
                  <div>
                    <span className="text-[var(--accent-purple)]">import</span> agenthub{' '}
                    <span className="text-[var(--accent-purple)]">as</span> ah
                  </div>
                  <div>
                    coding_agent = <span className="text-[var(--accent-blue)]">ah</span>.
                    <span className="text-[var(--accent-teal)]">load_agent</span>(
                    <span className="text-orange-400">&quot;agentplug/coding-agent&quot;</span>)
                  </div>
                  <div>
                    code = coding_agent.<span className="text-[var(--accent-teal)]">generate_code</span>(
                    <span className="text-orange-400">&quot;neural network class&quot;</span>)
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border)] text-[var(--accent-teal)] font-semibold">
                  ⚡ Result: 30 seconds
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Auto features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-8">
            Everything happens automatically
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '📥', text: 'Repository cloned' },
              { icon: '🔧', text: 'Environment created' },
              { icon: '📦', text: 'Dependencies installed' },
              { icon: '✅', text: 'Agent ready to use' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-[var(--text-secondary)] text-sm font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { ProblemSolution }
