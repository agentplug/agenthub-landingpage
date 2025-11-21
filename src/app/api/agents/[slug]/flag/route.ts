import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { flagAgent } from '@/lib/services/agent-service'

interface Params {
  params: {
    slug: string
  }
}

const ALLOWED_REASONS = new Set(['spam', 'malicious', 'broken', 'license', 'other'])

export async function POST(request: NextRequest, context: Params) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to flag an agent.' }, { status: 401 })
    }

    let reason = 'other'
    let notes: string | undefined

    try {
      const body = await request.json()
      if (typeof body?.reason === 'string' && ALLOWED_REASONS.has(body.reason)) {
        reason = body.reason
      }
      if (typeof body?.notes === 'string' && body.notes.trim().length > 0) {
        notes = body.notes.trim().slice(0, 1000)
      }
    } catch {
      // Ignore malformed body; default to "other"
    }

    const agent = await prisma.agent.findUnique({
      where: { slug: context.params.slug },
      select: { id: true },
    })

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    await flagAgent({
      agentId: agent.id,
      userId: session.user.id,
      reason,
      notes,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to flag agent', error)
    return NextResponse.json({ error: 'Failed to flag agent' }, { status: 500 })
  }
}
