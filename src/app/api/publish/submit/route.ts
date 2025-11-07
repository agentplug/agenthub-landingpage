import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { validateGitHubRepository } from '@/lib/services/github-service'
import {
  parseAgentYaml,
  publishSubmissionSchema,
  validatePythonInterface,
} from '@/lib/utils/validation'
import {
  createAgent,
  computeDocumentationUrl,
  computeDisclosureChecklist,
  computeEvaluationSummary,
  deriveTags,
} from '@/lib/services/agent-service'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'You must be signed in to publish an agent.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch (error) {
    console.error('Failed to parse request body', error)
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  try {
    const submission = publishSubmissionSchema.parse(body)

    const existingAgent = await prisma.agent.findUnique({ where: { repoUrl: submission.repoUrl } })
    if (existingAgent) {
      return NextResponse.json(
        { error: 'An agent for this repository has already been published.' },
        { status: 409 }
      )
    }

    const { repository, files } = await validateGitHubRepository(submission)
    const { metadata, warnings: metadataWarnings } = parseAgentYaml(files.agentYamlContent)
    const interfaceCheck = validatePythonInterface(files.agentPyContent)

    if (!interfaceCheck.isValid) {
      return NextResponse.json(
        {
          status: 'validation_failed',
          errors: interfaceCheck.errors,
          warnings: [...metadataWarnings, ...interfaceCheck.warnings],
        },
        { status: 422 }
      )
    }

    const disclosureChecklist = computeDisclosureChecklist(metadata) ?? undefined
    const evaluationSummaryUrl = computeEvaluationSummary(metadata) ?? undefined
    const readmeUrl = files.readmeUrl ?? computeDocumentationUrl(metadata)

    const agent = await createAgent({
      metadata: {
        ...metadata,
        tags: deriveTags(metadata),
      },
      repoUrl: submission.repoUrl,
      repoOwner: repository.owner,
      repoName: repository.repo,
      repoBranch: repository.branch,
      agentPyPath: files.agentPyPath,
      agentYamlPath: files.agentYamlPath,
      disclosureChecklist: disclosureChecklist ?? undefined,
      evaluationSummaryUrl,
      readmeUrl,
      creatorId: session.user.id,
    })

    return NextResponse.json({
      status: 'published',
      agent,
      warnings: [...metadataWarnings, ...interfaceCheck.warnings],
    })
  } catch (error) {
    console.error('Failed to publish agent', error)
    const message = error instanceof Error ? error.message : 'Failed to publish agent.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

