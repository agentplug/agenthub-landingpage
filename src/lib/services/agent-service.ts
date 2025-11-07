import { prisma } from '@/lib/db/prisma'
import { calculateAggregateScore } from '@/lib/services/ranking-service'
import { toSlug } from '@/lib/utils/slug'
import { calculateDisclosureCompleteness, type AgentMetadata } from '@/lib/utils/validation'

export interface AgentListParams {
  category?: string
  tags?: string[]
  verified?: boolean
  hasEvaluation?: boolean
  sort?: 'popular' | 'newest' | 'score'
  page?: number
  limit?: number
}

export interface AgentCreationInput {
  metadata: AgentMetadata
  repoUrl: string
  repoOwner: string
  repoName: string
  repoBranch: string
  agentPyPath: string
  agentYamlPath: string
  disclosureChecklist?: Record<string, boolean>
  evaluationSummaryUrl?: string
  readmeUrl?: string
  creatorId: string
}

function buildOrderBy(sort?: AgentListParams['sort']) {
  switch (sort) {
    case 'popular':
      return { usageCount: 'desc' as const }
    case 'newest':
      return { publishedAt: 'desc' as const }
    case 'score':
    default:
      return { aggregateScore: 'desc' as const }
  }
}

async function generateUniqueSlug(base: string) {
  let slug = toSlug(base)
  let attempt = 1

  // Use repo name if slug becomes empty
  if (!slug) {
    slug = `agent-${Date.now()}`
  }

  const existing = await prisma.agent.findUnique({ where: { slug } })
  if (!existing) {
    return slug
  }

  while (true) {
    const candidate = `${slug}-${attempt}`
    // eslint-disable-next-line no-await-in-loop
    const match = await prisma.agent.findUnique({ where: { slug: candidate } })
    if (!match) {
      return candidate
    }
    attempt += 1
  }
}

export async function listAgents(params: AgentListParams) {
  const page = Math.max(params.page ?? 1, 1)
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100)

  const where = {
    ...(params.category ? { category: params.category } : {}),
    ...(params.verified ? { isVerified: true } : {}),
    ...(params.hasEvaluation ? { evaluationSummaryUrl: { not: null } } : {}),
    ...(params.tags && params.tags.length
      ? { tags: { hasSome: params.tags } }
      : {}),
    status: 'published',
  }

  const [agents, total] = await Promise.all([
    prisma.agent.findMany({
      where,
      orderBy: buildOrderBy(params.sort),
      skip: (page - 1) * limit,
      take: limit,
      include: {
        creator: {
          select: {
            id: true,
            githubUsername: true,
            githubAvatar: true,
          },
        },
      },
    }),
    prisma.agent.count({ where }),
  ])

  return {
    agents,
    total,
    page,
    limit,
  }
}

export async function getAgentBySlug(slug: string) {
  return prisma.agent.findUnique({
    where: { slug },
    include: {
      creator: {
        select: {
          id: true,
          githubUsername: true,
          githubAvatar: true,
        },
      },
      flags: true,
    },
  })
}

export async function createAgent(input: AgentCreationInput) {
  const slug = await generateUniqueSlug(input.metadata.name)

  const publishedAt = new Date()
  const aggregateScore = calculateAggregateScore({
    usageCount: 0,
    hasValidInterface: true,
    isVerified: true,
    evaluationSummaryUrl: input.evaluationSummaryUrl,
    disclosureChecklist: input.disclosureChecklist,
    featured: false,
    isFlagged: false,
    flagCount: 0,
    publishedAt,
  })

  return prisma.agent.create({
    data: {
      slug,
      name: input.metadata.name,
      description: input.metadata.description,
      version: input.metadata.version,
      category: input.metadata.category,
      tags: deriveTags(input.metadata),
      repoUrl: input.repoUrl,
      repoOwner: input.repoOwner,
      repoName: input.repoName,
      repoBranch: input.repoBranch,
      agentPyPath: input.agentPyPath,
      agentYamlPath: input.agentYamlPath,
      hasValidInterface: true,
      license: input.metadata.license,
      readmeUrl: input.readmeUrl,
      isVerified: true,
      verificationStatus: 'verified',
      disclosureChecklist: input.disclosureChecklist ?? {},
      evaluationSummaryUrl: input.evaluationSummaryUrl,
      usageCount: 0,
      aggregateScore,
      status: 'published',
      featured: false,
      isFlagged: false,
      flagCount: 0,
      publishedAt,
      creatorId: input.creatorId,
    },
  })
}

export function deriveTags(metadata: AgentMetadata) {
  const tags = new Set(metadata.tags ?? [])
  if (metadata.category) {
    tags.add(metadata.category)
  }
  return Array.from(tags)
}

export function computeDisclosureChecklist(metadata: AgentMetadata) {
  return metadata.disclosures ?? undefined
}

export function computeEvaluationSummary(metadata: AgentMetadata) {
  return metadata.evaluation?.summaryUrl
}

export function computeDocumentationUrl(metadata: AgentMetadata) {
  return metadata.documentation?.url
}

export function calculateDisclosureScore(metadata: AgentMetadata) {
  return calculateDisclosureCompleteness(metadata.disclosures ?? undefined)
}

