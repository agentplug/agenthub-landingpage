import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { recordAgentUsage } from '@/lib/services/agent-service'

interface Params {
  params: {
    slug: string
  }
}

type UsageAction = 'view' | 'try' | 'install'

export async function POST(request: NextRequest, context: Params) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id ?? null

    let action: UsageAction = 'view'

    try {
      const body = await request.json().catch(() => null)
      const maybeAction = body?.action as UsageAction | undefined
      if (maybeAction === 'view' || maybeAction === 'try' || maybeAction === 'install') {
        action = maybeAction
      }
    } catch {
      // Ignore malformed body; default to 'view'
    }

    const agent = await prisma.agent.findUnique({
      where: { slug: context.params.slug },
      select: { id: true },
    })

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    await recordAgentUsage(agent.id, userId, action)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to record agent usage', error)
    return NextResponse.json({ error: 'Failed to record usage' }, { status: 500 })
  }
}
