'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Share2, Copy, Check } from 'lucide-react'

const InteractiveDemo = () => {
  const [selectedAgent, setSelectedAgent] = useState('agentplug/coding-agent')
  const [code, setCode] = useState(`import agenthub as ah

# Load coding agent
coding_agent = ah.load_agent("${selectedAgent}")

# Try this:
code = coding_agent.generate_code("React component for data table")
print(code)`)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const agents = [
    { id: 'agentplug/coding-agent', name: 'Coding Agent', description: 'Generate and review code' },
    { id: 'agentplug/analysis-agent', name: 'Data Analysis Agent', description: 'Analyze data and insights' },
    { id: 'agentplug/scientific-paper-analyzer', name: 'Paper Analyzer', description: 'Analyze research papers' },
  ]

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockOutput = `✅ Agent loaded successfully
🚀 Generating code...

const ReactButton = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-table">
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Load Data'}
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReactButton;`
    
    setOutput(mockOutput)
    setIsRunning(false)
  }

  const resetDemo = () => {
    setCode(`import agenthub as ah

# Load coding agent
coding_agent = ah.load_agent("${selectedAgent}")

# Try this:
code = coding_agent.generate_code("React component for data table")
print(code)`)
    setOutput('')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Try AgentHub Live
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience the power of one-line agent integration
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-2xl p-8 shadow-2xl"
        >
          {/* Agent Selector */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">Select Agent:</label>
            <select
              value={selectedAgent}
              onChange={(e) => {
                setSelectedAgent(e.target.value)
                setCode(`import agenthub as ah

# Load ${agents.find(a => a.id === e.target.value)?.name.toLowerCase()}
agent = ah.load_agent("${e.target.value}")

# Try this:
result = agent.analyze("sample input")
print(result)`)
                setOutput('')
              }}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} - {agent.description}
                </option>
              ))}
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Editor */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Code Editor:</h3>
                <button
                  onClick={copyCode}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="bg-black rounded-xl p-4 font-mono text-sm">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 bg-transparent text-white resize-none focus:outline-none"
                  placeholder="Enter your code here..."
                />
              </div>
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Output:</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                  <button
                    onClick={resetDemo}
                    className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-black rounded-xl p-4 font-mono text-sm h-64 overflow-auto">
                {output ? (
                  <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-gray-500">
                    Click "Run Code" to see the output...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Ready to try AgentHub in your own environment?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <Share2 className="w-4 h-4 mr-2" />
                Share Demo
              </button>
              <a href="/docs" className="btn-secondary">
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { InteractiveDemo }
