import type { AgentListParams } from '@/lib/services/agent-service'

export interface AgentListItem {
  id: string
  slug: string
  name: string
  description: string
  category?: string | null
  tags: string[]
  repoUrl: string
  isVerified: boolean
  evaluationSummaryUrl?: string | null
  usageCount: number
  aggregateScore: number | null
  featured: boolean
  createdAt: string
  publishedAt?: string | null
}

export interface AgentsResponse {
  agents: AgentListItem[]
  total: number
  page: number
  limit: number
}

export async function fetchAgents(params: Partial<AgentListParams> = {}): Promise<AgentsResponse> {
  const search = new URLSearchParams()

  if (params.category) search.set('category', params.category)
  if (params.verified) search.set('verified', 'true')
  if (params.hasEvaluation) search.set('hasEvaluation', 'true')
  if (params.sort) search.set('sort', params.sort)
  if (params.page) search.set('page', String(params.page))
  if (params.limit) search.set('limit', String(params.limit))
  if (params.tags && params.tags.length) search.set('tags', params.tags.join(','))

  const query = search.toString()
  const url = query ? `/api/agents?${query}` : '/api/agents'

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to load agents')
  }

  return response.json()
}

export async function fetchAgent(slug: string) {
  const response = await fetch(`/api/agents/${slug}`)
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.error ?? 'Failed to load agent')
  }
  return response.json()
}
