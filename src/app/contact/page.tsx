'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Github, Twitter, ArrowRight } from 'lucide-react'

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help with technical issues and questions',
      contact: 'support@agenthub.com',
      action: 'Send Email'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Discord Community',
      description: 'Join our community for discussions and support',
      contact: 'discord.gg/agenthub',
      action: 'Join Discord'
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub Issues',
      description: 'Report bugs and request features',
      contact: 'github.com/agentplug/agenthub',
      action: 'View on GitHub'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: 'Twitter',
      description: 'Follow us for updates and announcements',
      contact: '@agenthub',
      action: 'Follow Us'
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Get in touch with our team for support, questions, or feedback
          </motion.p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
              <p className="text-white/70 text-sm mb-4">{method.description}</p>
              <div className="text-purple-400 text-sm font-medium mb-4">{method.contact}</div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 border border-white/20">
                {method.action}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How do I get started with AgentHub?</h3>
                <p className="text-white/70 text-sm mb-4">
                  Simply install the SDK with `pip install agenthub-sdk` and start using agents with one line of code.
                </p>
                <a href="/docs" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  View Documentation →
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Is AgentHub free to use?</h3>
                <p className="text-white/70 text-sm mb-4">
                  Yes, AgentHub is free and open source. Some premium agents may have usage fees.
                </p>
                <a href="/pricing" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  View Pricing →
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How do I create my own agent?</h3>
                <p className="text-white/70 text-sm mb-4">
                  Use our SDK to build agents and publish them to the marketplace. Check our documentation for details.
                </p>
                <a href="/publish" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  Learn More →
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What programming languages are supported?</h3>
                <p className="text-white/70 text-sm mb-4">
                  AgentHub supports Python 3.11+ and provides agents for various programming languages and frameworks.
                </p>
                <a href="/marketplace" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  Browse Agents →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-16"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Response Times</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">24h</div>
                <div className="text-white/70">Email Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">2h</div>
                <div className="text-white/70">Discord Community</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">48h</div>
                <div className="text-white/70">GitHub Issues</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
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

export default Contact
