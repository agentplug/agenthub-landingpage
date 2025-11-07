import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAgentBySlug } from '@/lib/services/agent-service'

interface Params {
  params: {
    slug: string
  }
}

export async function GET(_request: NextRequest, context: Params) {
  try {
    const agent = await getAgentBySlug(context.params.slug)

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    return NextResponse.json({ agent })
  } catch (error) {
    console.error('Failed to fetch agent', error)
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 })
  }
}

