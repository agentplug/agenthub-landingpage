type DisclosureChecklist = Record<string, boolean> | null | undefined

export interface RankingInput {
  usageCount: number
  maxUsage?: number
  evaluationSummaryUrl?: string | null
  disclosureChecklist?: DisclosureChecklist
  hasValidInterface: boolean
  isVerified: boolean
  featured?: boolean
  isFlagged?: boolean
  flagCount?: number
  publishedAt?: Date | null
}

const TRUST_VERIFICATION_SCORE = 20
const TRUST_INTERFACE_SCORE = 15
const TRUST_DISCLOSURE_MAX = 10
const TRUST_EVALUATION_SCORE = 15
const USAGE_WEIGHT = 25
const NEW_AGENT_PENALTY = 5
const FEATURED_BONUS = 10
const FLAG_PENALTY = 50
const FLAG_INCREMENTAL_PENALTY = 5
const NEW_AGENT_WINDOW_DAYS = 7

function calculateDisclosureScore(checklist: DisclosureChecklist): number {
  if (!checklist || Object.keys(checklist).length === 0) {
    return 0
  }

  const entries = Object.entries(checklist)
  const completed = entries.filter(([, value]) => Boolean(value)).length
  return (completed / entries.length) * TRUST_DISCLOSURE_MAX
}

function calculateUsageScore(usageCount: number, maxUsage?: number): number {
  if (!maxUsage || maxUsage <= 0) {
    return 0
  }

  const normalized = Math.min(usageCount / maxUsage, 1)
  return normalized * USAGE_WEIGHT
}

function calculateNewAgentPenalty(publishedAt?: Date | null): number {
  if (!publishedAt) {
    return 0
  }

  const diffMs = Date.now() - publishedAt.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays < NEW_AGENT_WINDOW_DAYS ? NEW_AGENT_PENALTY : 0
}

export function calculateAggregateScore(input: RankingInput): number {
  const {
    usageCount,
    maxUsage,
    evaluationSummaryUrl,
    disclosureChecklist,
    hasValidInterface,
    isVerified,
    featured,
    isFlagged,
    flagCount,
    publishedAt,
  } = input

  let baseScore = 0

  if (isVerified) {
    baseScore += TRUST_VERIFICATION_SCORE
  }

  if (hasValidInterface) {
    baseScore += TRUST_INTERFACE_SCORE
  }

  if (evaluationSummaryUrl) {
    baseScore += TRUST_EVALUATION_SCORE
  }

  baseScore += calculateDisclosureScore(disclosureChecklist)
  baseScore += calculateUsageScore(usageCount, maxUsage)
  baseScore -= calculateNewAgentPenalty(publishedAt)

  if (featured) {
    baseScore += FEATURED_BONUS
  }

  const penalties = (isFlagged ? FLAG_PENALTY : 0) + (flagCount ?? 0) * FLAG_INCREMENTAL_PENALTY

  return Math.max(0, baseScore - penalties)
}

