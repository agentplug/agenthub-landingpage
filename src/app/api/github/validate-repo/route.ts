import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateGitHubRepository } from '@/lib/services/github-service'
import { parseAgentYaml, publishSubmissionSchema, validatePythonInterface } from '@/lib/utils/validation'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const repoUrl = url.searchParams.get('repoUrl')
  const branch = url.searchParams.get('branch') ?? undefined

  if (!repoUrl) {
    return NextResponse.json({ error: 'repoUrl query parameter is required.' }, { status: 400 })
  }

  try {
    const submission = publishSubmissionSchema.parse({ repoUrl, branch })
    const { repository, files } = await validateGitHubRepository(submission)
    const { metadata, warnings: metadataWarnings } = parseAgentYaml(files.agentYamlContent)
    const interfaceCheck = validatePythonInterface(files.agentPyContent)

    return NextResponse.json({
      repository,
      metadata,
      warnings: [...metadataWarnings, ...interfaceCheck.warnings],
      validation: {
        interface: interfaceCheck,
      },
    })
  } catch (error) {
    console.error('Repository validation failed', error)
    const message = error instanceof Error ? error.message : 'Repository validation failed.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

