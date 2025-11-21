'use client'

import { useEffect, useState } from 'react'
import { fetchAgent } from '@/lib/api/agents'

export function useAgent(slug: string) {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchAgent(slug)
        setData(result.agent)
      } catch (err) {
        console.error(err)
        setError('Failed to load agent details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      void load()
    }
  }, [slug])

  return { data, loading, error }
}
