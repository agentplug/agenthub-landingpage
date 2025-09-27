'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, ArrowRight, Copy, Check } from 'lucide-react'

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
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Before vs After AgentHub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            See how AgentHub transforms complex AI agent integration from weeks to seconds
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Before AgentHub */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex flex-col"
          >
            <div className="glass-dark border border-red-500/20 rounded-2xl p-8 flex-1 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-400">Before AgentHub</h3>
                  <p className="text-red-300">Traditional approach: 2-4 weeks setup</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm flex-1 flex flex-col">
                <div className="text-gray-400 mb-4"># Traditional approach: 2-4 weeks setup</div>
                <div className="space-y-2 text-gray-300 flex-1">
                  <div>1. Find agent on GitHub</div>
                  <div>2. Clone repository</div>
                  <div>3. Read documentation</div>
                  <div>4. Install dependencies (version conflicts!)</div>
                  <div>5. Configure environment</div>
                  <div>6. Debug integration issues</div>
                  <div>7. Write wrapper code</div>
                  <div>8. Test and validate</div>
                </div>
                <div className="mt-4 text-red-400 font-semibold">
                  ⏱️ Result: 2-4 weeks of development time
                </div>
              </div>
            </div>
          </motion.div>

          {/* With AgentHub */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex flex-col"
          >
            <div className="glass-dark border border-emerald-500/20 rounded-2xl p-8 flex-1 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400">With AgentHub</h3>
                  <p className="text-emerald-300">One line, 30 seconds</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col space-y-4">
                {/* Install command */}
                <div className="glass-dark rounded-xl p-4 font-mono text-sm relative">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{installCommand}</span>
                    <button 
                      onClick={() => copyToClipboard(installCommand, setCopiedInstall)}
                      className="ml-4 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedInstall ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Python code */}
                <div className="glass-dark rounded-xl p-6 font-mono text-sm flex-1 flex flex-col relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400"># One line, 30 seconds</div>
                    <button 
                      onClick={() => copyToClipboard(pythonCode, setCopiedCode)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="space-y-2 text-white flex-1">
                    <div><span className="text-blue-400">import</span> agenthub <span className="text-blue-400">as</span> ah</div>
                    <div>coding_agent = <span className="text-yellow-400">ah</span>.<span className="text-blue-400">load_agent</span>(<span className="text-green-400">&quot;agentplug/coding-agent&quot;</span>)</div>
                    <div>code = coding_agent.<span className="text-blue-400">generate_code</span>(<span className="text-green-400">&quot;neural network class&quot;</span>)</div>
                  </div>
                  <div className="mt-4 text-green-400 font-semibold">
                    ⚡ Result: 30 seconds to working agent
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Magic happens automatically */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Magic happens automatically:</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '📥', text: 'GitHub repository cloned' },
              { icon: '🔧', text: 'Virtual environment created' },
              { icon: '📦', text: 'Dependencies installed' },
              { icon: '✅', text: 'Agent validated and ready' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { ProblemSolution }
