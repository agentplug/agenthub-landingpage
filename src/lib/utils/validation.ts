import { z } from 'zod'
import { parse } from 'yaml'

export const publishSubmissionSchema = z.object({
  repoUrl: z
    .string()
    .url('Repository URL must be a valid URL')
    .refine((value) => value.includes('github.com'), 'Only GitHub repositories are supported for MVP'),
  branch: z.string().min(1).optional(),
})

const interfaceMethodSchema = z.object({
  description: z.string().min(1, 'Method description is required'),
  parameters: z
    .record(
      z.object({
        type: z.string().min(1, 'Parameter type is required'),
        description: z.string().optional(),
        required: z.boolean().default(false),
      })
    )
    .default({}),
  returns: z
    .object({
      type: z.string().min(1),
      description: z.string().optional(),
    })
    .optional(),
})

export const agentMetadataSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  version: z.string().min(1, 'Version is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  license: z.string().optional(),
  documentation: z
    .object({
      url: z.string().url().optional(),
    })
    .partial()
    .optional(),
  evaluation: z
    .object({
      summaryUrl: z.string().url().optional(),
    })
    .partial()
    .optional(),
  disclosures: z.record(z.boolean()).optional(),
  interface: z.object({
    methods: z
      .record(interfaceMethodSchema)
      .refine((value) => Object.keys(value).length > 0, 'At least one interface method is required'),
  }),
})

export type PublishSubmissionInput = z.infer<typeof publishSubmissionSchema>
export type AgentMetadata = z.infer<typeof agentMetadataSchema>

export interface AgentYamlValidationResult {
  metadata: AgentMetadata
  warnings: string[]
}

export interface RepoCoordinates {
  owner: string
  repo: string
  branch: string
}

export function parseAgentYaml(content: string): AgentYamlValidationResult {
  try {
    const metadata = agentMetadataSchema.parse(parse(content))
    const warnings: string[] = []

    if (!metadata.tags || metadata.tags.length === 0) {
      warnings.push('No tags provided. Tags improve discovery.')
    }

    return { metadata, warnings }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
      throw new Error(`agent.yaml validation failed: ${message}`)
    }

    throw new Error('Unable to parse agent.yaml')
  }
}

const GITHUB_REPO_REGEX = /github\.com\/(?<owner>[A-Za-z0-9_.-]+)\/(?<repo>[A-Za-z0-9_.-]+)(?:\/.+)?$/

export function parseGitHubRepoUrl(repoUrl: string, defaultBranch = 'main'): RepoCoordinates {
  const match = repoUrl.match(GITHUB_REPO_REGEX)
  if (!match || !match.groups) {
    throw new Error('Repository URL must follow the pattern https://github.com/<owner>/<repo>')
  }

  return {
    owner: match.groups.owner,
    repo: match.groups.repo.replace(/\.git$/, ''),
    branch: defaultBranch,
  }
}

export function calculateDisclosureCompleteness(disclosures?: Record<string, boolean> | null): number {
  if (!disclosures || Object.keys(disclosures).length === 0) {
    return 0
  }

  const total = Object.keys(disclosures).length
  const completed = Object.values(disclosures).filter(Boolean).length
  return completed / total
}

export interface PythonInterfaceCheckResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validatePythonInterface(agentPyContent: string): PythonInterfaceCheckResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!agentPyContent.trim()) {
    errors.push('agent.py is empty')
  }

  if (!agentPyContent.includes('if __name__ == "__main__"')) {
    errors.push('agent.py must define a CLI entry point guarded by if __name__ == "__main__"')
  }

  if (!agentPyContent.includes('json.loads') || !agentPyContent.includes('sys.argv')) {
    errors.push('agent.py must parse JSON input from sys.argv')
  }

  if (!agentPyContent.includes('print(')) {
    warnings.push('agent.py does not appear to print output; ensure it returns JSON results')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

