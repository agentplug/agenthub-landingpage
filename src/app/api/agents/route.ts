import { NextRequest, NextResponse } from 'next/server'
import { listAgents } from '@/lib/services/agent-service'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const category = searchParams.get('category') ?? undefined
  const verified = searchParams.get('verified') === 'true'
  const hasEvaluation = searchParams.get('hasEvaluation') === 'true'
  const sort = (searchParams.get('sort') ?? undefined) as 'popular' | 'newest' | 'score' | undefined
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined
  const tagsParam = searchParams.get('tags')
  const tags = tagsParam ? tagsParam.split(',').map((tag) => tag.trim()).filter(Boolean) : undefined

  try {
    const result = await listAgents({
      category,
      verified,
      hasEvaluation,
      sort,
      page,
      limit,
      tags,
    })

    return NextResponse.json({
      agents: result.agents.map((agent) => ({
        id: agent.id,
        slug: agent.slug,
        name: agent.name,
        description: agent.description,
        category: agent.category,
        tags: agent.tags,
        repoUrl: agent.repoUrl,
        isVerified: agent.isVerified,
        evaluationSummaryUrl: agent.evaluationSummaryUrl,
        usageCount: agent.usageCount,
        aggregateScore: agent.aggregateScore,
        featured: agent.featured,
        createdAt: agent.createdAt,
        publishedAt: agent.publishedAt,
        creator: {
          id: agent.creator.id,
          githubUsername: agent.creator.githubUsername,
          githubAvatar: agent.creator.githubAvatar,
        },
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
    })
  } catch (error) {
    console.error('Failed to list agents', error)
    return NextResponse.json({ error: 'Failed to list agents' }, { status: 500 })
  }
}

