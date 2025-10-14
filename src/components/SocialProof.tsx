'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Download, Users, Star } from 'lucide-react'

const stats = [
  { icon: Github, value: '1.2k', label: 'GitHub Stars' },
  { icon: Download, value: '15k+', label: 'Downloads' },
  { icon: Users, value: '3.2k+', label: 'Active Users' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
]

const testimonials = [
  {
    text: 'Game changer! Reduced our AI integration time from 3 weeks to 30 minutes.',
    author: 'Sarah Chen',
    role: 'Senior Developer',
    company: 'TechCorp',
  },
  {
    text: 'Saves us 2 weeks every project. The isolated environments are a lifesaver.',
    author: 'Mike Rodriguez',
    role: 'Data Team Lead',
    company: 'DataFlow Inc',
  },
  {
    text: 'Best AI tool we\'ve used. The agent marketplace is incredible.',
    author: 'Alex Kim',
    role: 'Research Director',
    company: 'Innovation Labs',
  },
]

const SocialProof = () => {
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
            Trusted by developers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Join thousands who have transformed their AI workflows
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[var(--accent-teal-light)] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                  {stat.value}
                </div>
                <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-4 h-4 text-[var(--accent-teal)] fill-[var(--accent-teal)]" />
                ))}
              </div>
              <blockquote className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed">
                &quot;{testimonial.text}&quot;
              </blockquote>
              <div>
                <div className="font-semibold text-[var(--text-primary)] text-sm">
                  {testimonial.author}
                </div>
                <div className="text-[var(--text-tertiary)] text-xs">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { SocialProof }
