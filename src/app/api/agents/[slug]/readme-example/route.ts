import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAgentBySlug } from '@/lib/services/agent-service'
import { fetchReadmeContent } from '@/lib/services/github-service'

interface Params {
  params: {
    slug: string
  }
}

function extractUsageBlock(markdown: string): string | null {
  const lines = markdown.split(/\r?\n/)

  // Find first heading line containing "usage"
  let headingIndex = -1
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith('#') && trimmed.toLowerCase().includes('usage')) {
      headingIndex = i
      break
    }
  }

  if (headingIndex === -1) {
    return null
  }

  const usageHeading = lines[headingIndex]
  const usageLevelMatch = usageHeading.match(/^#+/)
  const usageLevel = usageLevelMatch ? usageLevelMatch[0].length : 1

  // Find first fenced code block after that heading (before the next heading of same or higher level)
  let fenceStart = -1
  for (let i = headingIndex + 1; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith('#')) {
      const levelMatch = trimmed.match(/^#+/)
      const level = levelMatch ? levelMatch[0].length : 1
      if (level <= usageLevel) {
        // Reached a new top-level or sibling section without finding a code block
        break
      }
      // Sub-heading (e.g., "Direct Usage") – continue searching
      continue
    }
    if (trimmed.startsWith('```')) {
      fenceStart = i
      break
    }
  }

  if (fenceStart === -1) {
    return null
  }

  const codeLines: string[] = []
  for (let i = fenceStart + 1; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith('```')) {
      break
    }
    codeLines.push(lines[i])
  }

  const code = codeLines.join('\n').trim()
  return code || null
}

export async function GET(_request: NextRequest, context: Params) {
  try {
    const agent = await getAgentBySlug(context.params.slug)

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    const branch = agent.repoBranch ?? 'main'
    const readme = await fetchReadmeContent(agent.repoOwner, agent.repoName, branch)

    if (!readme) {
      return NextResponse.json({ code: null })
    }

    const code = extractUsageBlock(readme)

    return NextResponse.json({ code: code ?? null })
  } catch (error) {
    console.error('Failed to load README example', error)
    return NextResponse.json({ code: null })
  }
}
