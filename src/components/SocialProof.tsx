'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Github, Download, Users } from 'lucide-react'

const SocialProof = () => {
  const testimonials = [
    {
      text: "Game changer! Reduced our AI integration time from 3 weeks to 30 minutes.",
      author: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp"
    },
    {
      text: "Saves us 2 weeks every project. The isolated environments are a lifesaver.",
      author: "Mike Rodriguez",
      role: "Data Team Lead",
      company: "DataFlow Inc"
    },
    {
      text: "Best AI tool we've used. The agent marketplace is incredible.",
      author: "Alex Kim",
      role: "Research Director",
      company: "Innovation Labs"
    }
  ]

  const stats = [
    { icon: Github, value: '1.2k', label: 'GitHub Stars' },
    { icon: Download, value: '15k+', label: 'Downloads' },
    { icon: Users, value: '3.2k+', label: 'Active Users' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' }
  ]

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
            Trusted by Developers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of developers who have transformed their AI workflows with AgentHub
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-gray-600 text-sm">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current mx-1" />
            ))}
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-2">
            4.9/5
          </div>
          
          <div className="text-gray-600 mb-6">
            Based on 2,847 reviews
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Github className="w-4 h-4 mr-2" />
              GitHub: 1.2k ⭐
            </div>
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Downloads: 15k+
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Active: 3.2k+
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { SocialProof }
