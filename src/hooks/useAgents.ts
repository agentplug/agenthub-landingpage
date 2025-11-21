'use client'

import { useEffect, useState } from 'react'
import type { AgentListParams } from '@/lib/services/agent-service'
import type { AgentsResponse } from '@/lib/api/agents'
import { fetchAgents } from '@/lib/api/agents'

export function useAgents(initialParams: Partial<AgentListParams> = {}) {
  const [params, setParams] = useState<Partial<AgentListParams>>(initialParams)
  const [data, setData] = useState<AgentsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchAgents(params)
        setData(result)
      } catch (err) {
        console.error(err)
        setError('Unable to load agents right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [JSON.stringify(params)])

  return {
    data,
    loading,
    error,
    params,
    setParams,
  }
}
