'use client'

import { useState } from 'react'

export type PublishStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error'

export interface ValidationResponse {
  metadata: {
    name: string
    description: string
    tags: string[]
  }
  warnings: string[]
}

export interface PublishedAgentResponse {
  status: 'published'
  agent: {
    slug: string
    name: string
    repoUrl: string
  }
  warnings: string[]
}

export function usePublish() {
  const [status, setStatus] = useState<PublishStatus>('idle')
  const [warnings, setWarnings] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [validationPreview, setValidationPreview] = useState<ValidationResponse['metadata'] | null>(null)
  const [successAgent, setSuccessAgent] = useState<PublishedAgentResponse['agent'] | null>(null)

  const reset = () => {
    setWarnings([])
    setError(null)
    setValidationPreview(null)
    setSuccessAgent(null)
  }

  const validate = async (repoUrl: string, branch?: string) => {
    reset()
    setStatus('validating')
    try {
      const params = new URLSearchParams({ repoUrl })
      if (branch) params.append('branch', branch)
      const response = await fetch(`/api/github/validate-repo?${params.toString()}`)
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload?.error ?? 'Validation failed')
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

  const submit = async (payload: { repoUrl: string; branch?: string }) => {
    reset()
    setStatus('submitting')
    try {
      const response = await fetch('/api/publish/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        if (data.status === 'validation_failed' && Array.isArray(data.errors)) {
          setWarnings(data.warnings ?? [])
          setError(data.errors.join('\n'))
        } else {
          setError(data.error ?? 'Failed to publish agent')
        }
        setStatus('error')
        return { needsAuth: response.status === 401 }
      }

      const data: PublishedAgentResponse = await response.json()
      setWarnings(data.warnings)
      setSuccessAgent(data.agent)
      setStatus('success')
      return { needsAuth: false, agent: data.agent }
    } catch (err) {
      setError('Unexpected error while publishing. Please try again.')
      setStatus('error')
      return { needsAuth: false }
    }
  }

  return {
    status,
    warnings,
    error,
    validationPreview,
    successAgent,
    validate,
    submit,
    reset,
  }
}
