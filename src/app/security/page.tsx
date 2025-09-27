'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Security = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Isolated Environments',
      description: 'Each agent runs in its own secure, isolated environment to prevent conflicts and ensure security.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Encrypted Communication',
      description: 'All data transmission between agents and your application is encrypted using industry-standard protocols.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Audit Logging',
      description: 'Comprehensive logging of all agent activities for security monitoring and compliance.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Code Verification',
      description: 'All published agents undergo security scanning and verification before being made available.'
    }
  ]

  const compliance = [
    'SOC 2 Type II Certified',
    'GDPR Compliant',
    'ISO 27001 Certified',
    'HIPAA Ready'
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
            Security
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Enterprise-grade security for your AI agent infrastructure
          </motion.p>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass-dark rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Compliance & Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compliance.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-white font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Isolation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Isolated Environment Architecture</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Each agent runs in its own virtual environment
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Isolated file system and network access
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Resource limits and monitoring
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Automatic cleanup after execution
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Benefits</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    No dependency conflicts between agents
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Enhanced security and isolation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Predictable performance
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    Easy scaling and management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Security Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mb-16"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Security Questions?</h2>
            <p className="text-white/70 mb-6">Our security team is here to help with any questions or concerns</p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              Contact Security Team
            </Link>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Security
