'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, XCircle, Clock, ArrowRight } from 'lucide-react'

const Status = () => {
  const services = [
    {
      name: 'AgentHub API',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '45ms'
    },
    {
      name: 'Agent Marketplace',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '120ms'
    },
    {
      name: 'Agent Execution',
      status: 'operational',
      uptime: '99.7%',
      responseTime: '2.1s'
    },
    {
      name: 'Documentation',
      status: 'operational',
      uptime: '100%',
      responseTime: '80ms'
    }
  ]

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Agent Execution',
      status: 'resolved',
      date: '2024-01-10',
      description: 'Planned maintenance window for performance improvements'
    },
    {
      id: 2,
      title: 'API Rate Limiting Issue',
      status: 'resolved',
      date: '2024-01-05',
      description: 'Temporary rate limiting issues affecting some users'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-emerald-400'
      case 'degraded':
        return 'text-yellow-400'
      case 'outage':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

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
            System Status
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Real-time status of AgentHub services and infrastructure
          </motion.p>
        </div>

        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-white">All Systems Operational</h2>
                <p className="text-white/70">All services are running normally</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                <div className="text-white/70">Overall Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">45ms</div>
                <div className="text-white/70">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-white/70">Active Incidents</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Status */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(service.status)}
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                      <p className={`text-sm ${getStatusColor(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70">Uptime: {service.uptime}</div>
                    <div className="text-sm text-white/70">Response: {service.responseTime}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div key={incident.id} className="border-b border-white/10 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                    <span className="text-sm text-emerald-400 bg-emerald-400/20 px-2 py-1 rounded">
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{incident.description}</p>
                  <div className="text-xs text-white/60">{incident.date}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Page Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mb-16"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-6">
              Subscribe to status updates and get notified about any service disruptions
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
          transition={{ duration: 0.6, delay: 1.2 }}
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

export default Status
