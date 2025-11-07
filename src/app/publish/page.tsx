'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Upload,
  Code,
  DollarSign,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Loader2,
  Github,
} from 'lucide-react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

type PublishStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error'

interface ValidationWarnings {
  warnings: string[]
}

interface PublishedAgentResponse {
  status: 'published'
  agent: {
    slug: string
    name: string
    repoUrl: string
  }
  warnings: string[]
}

interface ValidationResponse {
  metadata: {
    name: string
    description: string
    tags: string[]
  }
  warnings: string[]
}

const steps = [
  {
    number: 1,
    title: 'Follow AgentHub Standard',
    description: 'Ensure your repository contains agent.py and agent.yaml following the AgentHub interface.',
    icon: <Code className="w-6 h-6" />,
  },
  {
    number: 2,
    title: 'Run Local Checks',
    description: 'Verify CLI behavior locally (python agent.py "{...}") and document installation steps.',
    icon: <Upload className="w-6 h-6" />,
  },
  {
    number: 3,
    title: 'Submit Repository URL',
    description: 'AgentHub validates your repo automatically; passing checks publishes instantly.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: 4,
    title: 'Earn with Usage',
    description: 'Agents rank higher with quality signals and usage. You keep 70% of revenue.',
    icon: <DollarSign className="w-6 h-6" />,
  },
]

const Publish = () => {
  const { status: sessionStatus, data: session } = useSession()
  const [repoUrl, setRepoUrl] = useState('')
  const [branch, setBranch] = useState('')
  const [status, setStatus] = useState<PublishStatus>('idle')
  const [warnings, setWarnings] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [successResponse, setSuccessResponse] = useState<PublishedAgentResponse['agent'] | null>(null)
  const [validationPreview, setValidationPreview] = useState<ValidationResponse['metadata'] | null>(null)

  const isAuthenticated = sessionStatus === 'authenticated'

  const resetFeedback = () => {
    setWarnings([])
    setError(null)
    setSuccessResponse(null)
    setValidationPreview(null)
  }

  const handleValidate = async () => {
    if (!repoUrl) {
      return
    }
    resetFeedback()
    setStatus('validating')
    try {
      const params = new URLSearchParams({ repoUrl })
      if (branch) {
        params.append('branch', branch)
      }
      const response = await fetch(`/api/github/validate-repo?${params.toString()}`)
      if (!response.ok) {
        throw new Error((await response.json()).error ?? 'Validation failed')
      }
      const data: ValidationResponse = await response.json()
      setValidationPreview(data.metadata)
      setWarnings(data.warnings)
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Validation failed')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isAuthenticated) {
      signIn('github')
      return
    }

    resetFeedback()
    setStatus('submitting')

    try {
      const response = await fetch('/api/publish/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl,
          branch: branch || undefined,
        }),
      })

      if (!response.ok) {
        const payload = await response.json()
        if (response.status === 401) {
          signIn('github')
          return
        }

        if (payload.status === 'validation_failed' && payload.errors) {
          setWarnings(payload.warnings ?? [])
          setError(payload.errors.join('\n'))
        } else {
          setError(payload.error ?? 'Failed to publish agent')
        }
        setStatus('error')
        return
      }

      const data: PublishedAgentResponse = await response.json()
      setWarnings(data.warnings)
      setSuccessResponse(data.agent)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setError('Unexpected error while publishing. Please try again.')
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'
  const validating = status === 'validating'

  return (
    <div className="min-h-screen py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight"
          >
            Publish Your Agent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Submit your GitHub repository. If automated checks pass, your agent goes live immediately.
          </motion.p>
        </div>

        {/* Publish Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Repository Details</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2" htmlFor="repoUrl">
                  GitHub Repository URL
                </label>
                <input
                  id="repoUrl"
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(event) => setRepoUrl(event.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-teal)] transition-colors"
                />
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  Your repo must include <code className="text-[var(--accent-teal)]">agent.py</code> and <code className="text-[var(--accent-teal)]">agent.yaml</code> in the root (or src/).
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2" htmlFor="branch">
                  Branch (optional)
                </label>
                <input
                  id="branch"
                  type="text"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  placeholder="main"
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-teal)] transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  onClick={handleValidate}
                  disabled={!repoUrl || validating}
                >
                  {validating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  Pre-validate
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  disabled={!repoUrl || submitting}
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Publish
                </button>
              </div>

              {sessionStatus !== 'authenticated' && (
                <p className="text-xs text-[var(--text-tertiary)]">
                  You will be asked to sign in with GitHub when publishing.
                </p>
              )}
            </form>
          </div>

          <div className="space-y-6">
            {validationPreview && (
              <div className="card p-6 border border-[var(--accent-teal-light)]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-teal)] mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Validation Passed</h3>
                    <p className="text-[var(--text-secondary)] text-sm">AgentHub detected:</p>
                    <ul className="mt-3 space-y-1 text-sm text-[var(--text-secondary)]">
                      <li><strong>Name:</strong> {validationPreview.name}</li>
                      <li><strong>Description:</strong> {validationPreview.description}</li>
                      <li><strong>Tags:</strong> {validationPreview.tags.join(', ') || 'None provided'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {warnings.length > 0 && (
              <div className="card p-6 border border-[var(--accent-blue-light)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--accent-blue)]" />
                  Suggested Improvements
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-secondary)]">
                  {warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {error && (
              <div className="card p-6 border border-[var(--accent-purple-light)]">
                <h3 className="text-lg font-semibold text-[var(--accent-purple)] mb-2">Submission Blocked</h3>
                <p className="text-sm text-[var(--text-secondary)] whitespace-pre-line">{error}</p>
              </div>
            )}

            {successResponse && (
              <div className="card p-6 border border-[var(--accent-teal-light)]">
                <h3 className="text-lg font-semibold text-[var(--accent-teal)] mb-2">Agent Published!</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {successResponse.name} is live in the marketplace. We assigned a ranking baseline and trust badges.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/agents/${successResponse.slug}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Listing
                  </Link>
                  <Link
                    href={successResponse.repoUrl}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Repo
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Publishing Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] text-center mb-12">How Publishing Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-blue)] rounded-lg flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-[var(--accent-teal)] mb-2">Step {step.number}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="card">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Agent Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Technical Requirements</h3>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>• Python 3.11+ compatibility</li>
                  <li>• Entry point: <code>agent.py</code> with JSON CLI interface</li>
                  <li>• Valid <code>agent.yaml</code> metadata file</li>
                  <li>• Installation instructions in README</li>
                  <li>• Proper error handling and logging</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quality Signals</h3>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>• Provide evaluation summary (optional but rewarded)</li>
                  <li>• Complete disclosure checklist</li>
                  <li>• Add usage documentation and examples</li>
                  <li>• Encourage early adopters to try your agent</li>
                  <li>• Respond quickly to community feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mb-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Need a refresher?</h2>
            <p className="text-[var(--text-secondary)] mb-6">Review the AgentHub interface standard and documentation before submitting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Code className="w-5 h-5" />
                View Documentation
              </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Contact Support
              </Link>
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
          <Link
            href="/"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Publish
