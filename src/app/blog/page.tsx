'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Getting Started with AgentHub: A Complete Guide',
      excerpt: 'Learn how to integrate AI agents into your workflow with our comprehensive getting started guide.',
      author: 'AgentHub Team',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Tutorial'
    },
    {
      id: 2,
      title: 'Building Custom AI Agents: Best Practices',
      excerpt: 'Discover the best practices for creating and deploying custom AI agents with AgentHub.',
      author: 'Sarah Chen',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Development'
    },
    {
      id: 3,
      title: 'AgentHub vs Traditional AI Integration',
      excerpt: 'Compare AgentHub\'s approach to AI agent integration with traditional methods.',
      author: 'Mike Rodriguez',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Comparison'
    },
    {
      id: 4,
      title: 'Case Study: How TechCorp Reduced Integration Time by 90%',
      excerpt: 'A real-world case study showing how TechCorp transformed their AI workflow with AgentHub.',
      author: 'Alex Kim',
      date: '2024-01-01',
      readTime: '7 min read',
      category: 'Case Study'
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
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Insights, tutorials, and updates from the AgentHub team
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-purple-400 bg-purple-400/20 px-3 py-1 rounded-full">
                Featured
              </span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/20 px-3 py-1 rounded-full">
                {posts[0].category}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{posts[0].title}</h2>
            <p className="text-white/70 mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {posts[0].author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {posts[0].date}
                </div>
                <span>{posts[0].readTime}</span>
              </div>
              <Link
                href={`/blog/${posts[0].id}`}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Read more <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
              <p className="text-white/70 mb-4 text-sm">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                Read more <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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

export default Blog
