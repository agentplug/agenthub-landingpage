'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Zap, Wrench, Lock, Download, Terminal } from 'lucide-react'

const KeyFeatures = () => {
  const features = [
    {
      icon: Bot,
      title: 'Agent Marketplace',
      description: 'Discover and install agents from GitHub',
      details: 'Browse hundreds of pre-built AI agents ready to use'
    },
    {
      icon: Zap,
      title: 'One-Line Integration',
      description: 'ah.load_agent("user/agent")',
      details: 'Load any agent with a single line of code'
    },
    {
      icon: Wrench,
      title: 'Custom Tools',
      description: 'Create and inject tools with @tool decorator',
      details: 'Build powerful agents with your own custom functionality'
    },
    {
      icon: Lock,
      title: 'Isolated Environments',
      description: 'No dependency conflicts',
      details: 'Each agent runs in its own virtual environment'
    },
    {
      icon: Download,
      title: 'Auto-Installation',
      description: 'Agents install automatically when needed',
      details: 'No manual setup required - everything just works'
    },
    {
      icon: Terminal,
      title: 'CLI Interface',
      description: 'Full command-line management',
      details: 'Manage agents, run commands, and automate workflows'
    }
  ]

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
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to integrate AI agents into your workflow
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 font-medium mb-3">
                  {feature.description}
                </p>
                
                <p className="text-gray-600">
                  {feature.details}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-900 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Using Custom Tools</h3>
          <p className="text-gray-400 text-center mb-6">Create powerful agents with your own tools:</p>
          
          <div className="bg-black rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-4"># Define custom tools</div>
            <div className="space-y-2 text-white">
              <div><span className="text-blue-400">from</span> agentplug.core.tools <span className="text-blue-400">import</span> tool, run_resources</div>
              <div></div>
              <div><span className="text-blue-400">@tool</span>(name=<span className="text-green-400">&quot;web_search&quot;</span>, description=<span className="text-green-400">&quot;Search the web for information&quot;</span>)</div>
              <div><span className="text-blue-400">def</span> web_search(query: <span className="text-yellow-400">str</span>, max_results: <span className="text-yellow-400">int</span> = <span className="text-orange-400">10</span>) -&gt; <span className="text-yellow-400">list</span>:</div>
              <div className="ml-4 text-gray-300">    <span className="text-gray-500">&quot;&quot;&quot;Search the web and return results.&quot;&quot;&quot;</span></div>
              <div className="ml-4 text-gray-300">    <span className="text-gray-500"># Your search implementation here</span></div>
              <div className="ml-4 text-gray-300">    <span className="text-blue-400">return</span> [<span className="text-green-400">f&quot;Result {'{'}i+1{'}'} for &apos;{'{'}query{'}'}&apos;&quot;</span> <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> <span className="text-yellow-400">range</span>(<span className="text-yellow-400">min</span>(max_results, <span className="text-orange-400">3</span>))]</div>
              <div></div>
              <div><span className="text-blue-400"># Use tools with agents</span></div>
              <div><span className="text-blue-400">import</span> agenthub <span className="text-blue-400">as</span> ah</div>
              <div>agent = <span className="text-yellow-400">ah</span>.<span className="text-blue-400">load_agent</span>(<span className="text-green-400">&quot;agentplug/analysis-agent&quot;</span>, tools=[<span className="text-green-400">&quot;web_search&quot;</span>, <span className="text-green-400">&quot;data_analyzer&quot;</span>])</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { KeyFeatures }
