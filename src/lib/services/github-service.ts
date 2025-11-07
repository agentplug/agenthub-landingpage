import { Octokit } from '@octokit/rest'
import { RequestError } from '@octokit/request-error'
import { publishSubmissionSchema, parseGitHubRepoUrl, type PublishSubmissionInput } from '@/lib/utils/validation'

export interface GitHubRepositoryInfo {
  owner: string
  repo: string
  branch: string
  defaultBranch: string
  htmlUrl: string
  description?: string | null
  stars: number
  forks: number
  openIssues: number
}

export interface AgentFilePayload {
  agentPyPath: string
  agentPyContent: string
  agentYamlPath: string
  agentYamlContent: string
  readmeUrl?: string
}

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: 'AgentHub-Marketplace/0.1.0',
})

async function fetchRepository(owner: string, repo: string) {
  const response = await octokit.repos.get({ owner, repo })
  return response.data
}

async function fetchFileContent(owner: string, repo: string, path: string, ref: string) {
  try {
    const response = await octokit.repos.getContent({ owner, repo, path, ref })
    if (!('content' in response.data)) {
      throw new Error(`Expected file content for ${path}`)
    }

    const content = Buffer.from(response.data.content, 'base64').toString('utf8')
    return { content, path }
  } catch (error) {
    if ((error as { status?: number }).status === 404) {
      return null
    }

    throw error
  }
}

async function resolveAgentFile(owner: string, repo: string, ref: string, filename: string) {
  const candidatePaths = [filename, `src/${filename}`, `agents/${filename}`]

  for (const path of candidatePaths) {
    const result = await fetchFileContent(owner, repo, path, ref)
    if (result) {
      return result
    }
  }

  return null
}

export async function validateGitHubRepository(input: PublishSubmissionInput) {
  const payload = publishSubmissionSchema.parse(input)
  const coordinates = parseGitHubRepoUrl(payload.repoUrl, payload.branch ?? 'main')

  let repoData
  try {
    repoData = await fetchRepository(coordinates.owner, coordinates.repo)
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      throw new Error('Repository not found or inaccessible. Ensure the URL is correct and the repo is public.')
    }

    if (error instanceof RequestError && error.status === 403) {
      throw new Error('GitHub rate limit reached. Please add a GITHUB_ACCESS_TOKEN or try again later.')
    }

    throw error
  }

  const branch = payload.branch ?? repoData.default_branch ?? 'main'
  const [agentYaml, agentPy] = await Promise.all([
    resolveAgentFile(coordinates.owner, coordinates.repo, branch, 'agent.yaml'),
    resolveAgentFile(coordinates.owner, coordinates.repo, branch, 'agent.py'),
  ])

  if (!agentYaml) {
    throw new Error('agent.yaml not found in repository root, src/, or agents/')
  }

  if (!agentPy) {
    throw new Error('agent.py not found in repository root, src/, or agents/')
  }

  const readme = await fetchFileContent(coordinates.owner, coordinates.repo, 'README.md', branch)

  const repository: GitHubRepositoryInfo = {
    owner: coordinates.owner,
    repo: coordinates.repo,
    branch,
    defaultBranch: repoData.default_branch ?? branch,
    htmlUrl: repoData.html_url,
    description: repoData.description,
    stars: repoData.stargazers_count ?? 0,
    forks: repoData.forks_count ?? 0,
    openIssues: repoData.open_issues_count ?? 0,
  }

  const files: AgentFilePayload = {
    agentPyPath: agentPy.path,
    agentPyContent: agentPy.content,
    agentYamlPath: agentYaml.path,
    agentYamlContent: agentYaml.content,
    readmeUrl: readme ? `${repoData.html_url}/blob/${branch}/${readme.path}` : undefined,
  }

  return { repository, files }
}

