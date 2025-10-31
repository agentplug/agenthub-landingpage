# AgentHub Platform Implementation Design

**Document Type**: Implementation Design  
**Author**: William  
**Date Created**: 2025-06-28  
**Last Updated**: 2025-06-28  
**Status**: Draft  
**Related Documents**: `docs/requirement-analysis/agenthub-requirement-analysis.md`

## Executive Summary

This document outlines the implementation design for transforming the existing AgentHub landing page into a functional marketplace platform. The current codebase provides a solid UI foundation but lacks backend functionality. This design proposes a simple, maintainable, and scalable architecture that aligns with the MVP requirements.

## 1. Current State Analysis

### 1.1 What's Implemented (UI Only)

**Pages & Routes:**
- ✅ Home page (`/`) - Landing page with hero, features, marketplace preview
- ✅ Marketplace page (`/marketplace`) - Agent listing with search/filter UI (mock data)
- ✅ Agent detail pages (`/agents/[slug]`) - Individual agent profiles (hardcoded)
- ✅ Publish page (`/publish`) - Submission flow UI (static content)
- ✅ Docs page (`/docs`) - Placeholder
- ✅ Navigation component - Working navigation with dropdown menus
- ✅ Responsive design - Mobile/tablet/desktop layouts

**Components:**
- `AgentMarketplace.tsx` - Agent card grid (mock data)
- `Hero.tsx`, `ProblemSolution.tsx`, `KeyFeatures.tsx`, `SocialProof.tsx`, `CTA.tsx`, `Footer.tsx`

**Tech Stack:**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

### 1.2 What's Missing

**Backend:**
- ❌ No API routes (`/api/*`)
- ❌ No database/data persistence
- ❌ No authentication system
- ❌ No file upload/storage
- ❌ No agent repository validation
- ❌ No search/filter backend logic
- ❌ No ranking/aggregation logic

**Frontend Gaps:**
- ❌ No dynamic data fetching (all hardcoded)
- ❌ No form submissions (publish flow is static)
- ❌ No authentication UI (login/signup)
- ❌ No real-time updates
- ❌ No error handling/loading states

## 2. UI Modifications for MVP Alignment

### 2.1 Existing UI → Requirements Mapping

| Current UI Component | MVP Requirement | Modification Needed |
|---------------------|-----------------|-------------------|
| Marketplace listing | Agent discovery with ranking | Add ranking logic, trust badges, verification indicators |
| Agent detail page | Agent profile with disclosure checklist | Add: verification status, evaluation summary, repo attribution, disclosure checklist |
| Publish page | Contribution flow with submission form | Convert to functional form with validation and submission API |
| Navigation | Lightweight identity (auth) | Add sign-in button/link (no profile pages) |
| Agent cards | Trust signals, popularity | Add verification badges, evaluation badges, usage stats |

### 2.2 Required UI Additions

**Marketplace Page (`/marketplace`):**
- Trust signal badges (verified, evaluation results)
- Filter by: domains, capabilities, trust signals, popularity
- Search functionality (backend-powered)
- Ranking display (top agents first)

**Agent Detail Page (`/agents/[slug]`):**
- Publisher attribution (name, avatar, repo link - no profile page)
- Verification status badge
- Evaluation summary (creator-provided link)
- Disclosure checklist display (creator-provided)
- Usage statistics (backend-derived)

**Publish Page (`/publish`):**
- Submission form with:
  - Repository URL (GitHub)
  - Agent metadata (name, description, tags, capabilities)
  - Disclosure checklist
  - Evaluation summary link (optional)
  - License declaration
- Submission checklist validation
- Form submission to backend API

**Navigation:**
- Sign-in button (GitHub OAuth flow)
- Conditional display: "Publish" link only for authenticated users

**New Pages (if needed):**
- `/login` - OAuth callback/login
- `/docs` - AgentHub library documentation (MVP requirement)

## 3. Backend Architecture Design

### 3.1 Architecture Principles

**Simplicity First:**
- Start with Next.js API routes (no separate backend service initially)
- Use serverless-friendly database (PostgreSQL on Supabase/Neon or Vercel Postgres)
- Leverage Next.js middleware for auth
- Keep backend in same repo for MVP

**Maintainability:**
- Clear separation of concerns (API routes, services, data layer)
- TypeScript throughout
- Consistent error handling
- Environment-based configuration

**Scalability:**
- Stateless API design
- Database indexing for search/filter
- Caching strategy for read-heavy operations
- Architecture supports future migration to microservices if needed

### 3.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Pages   │  │Components│  │   Hooks   │  │  Utils   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↕ (API Calls)
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes (/api)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Agents  │  │   Auth   │  │  Search  │  │  Publish │    │
│  │   API    │  │   API    │  │   API    │  │   API    │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Agent   │  │   Auth   │  │  GitHub  │  │  Ranking │    │
│  │ Service  │  │  Service │  │  Service │  │  Service │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Database │  │   ORM   │  │   Cache  │                   │
│  │(Postgres)│  │ (Prisma)│  │  (Redis) │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    External Services                          │
│  ┌──────────┐  ┌──────────┐                                │
│  │  GitHub  │  │  OAuth   │                                │
│  │   API    │  │ Provider │                                │
│  └──────────┘  └──────────┘                                │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Technology Stack

**Backend:**
- **API Framework**: Next.js API Routes (App Router)
- **Database**: PostgreSQL (Vercel Postgres or Supabase)
- **ORM**: Prisma (type-safe, migration-friendly)
- **Authentication**: NextAuth.js v5 (Auth.js) with GitHub OAuth
- **Validation**: Zod (schema validation)
- **HTTP Client**: Built-in `fetch` or `axios` for external APIs

**Infrastructure:**
- **Hosting**: Vercel (Next.js optimized)
- **Database Hosting**: Vercel Postgres or Supabase (serverless PostgreSQL)
- **File Storage**: GitHub (for agent repos), Vercel Blob (if needed for assets)
- **Caching**: Vercel Edge Config or Redis (for read-heavy operations)

**External Services:**
- **GitHub API**: For repository validation and metadata
- **OAuth Provider**: GitHub OAuth (via NextAuth.js)

## 4. Data Models

### 4.1 Database Schema

```prisma
// schema.prisma

// Users (lightweight - only for attribution)
model User {
  id            String   @id @default(cuid())
  githubId       String   @unique
  githubUsername String
  githubAvatar  String?
  displayName   String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  agents        Agent[]
}

// Agents
model Agent {
  id                  String   @id @default(cuid())
  slug                String   @unique
  name                String
  description         String
  version             String
  category            String?  // domain/tag
  tags                String[] // capabilities
  
  // Repository info
  repoUrl             String   @unique
  repoOwner           String
  repoName            String
  repoBranch          String   @default("main")
  
  // AgentHub standard compliance
  agentPyPath         String?  // path to agent.py in repo
  agentYamlPath      String?  // path to agent.yaml in repo
  hasValidInterface  Boolean  @default(false)
  
  // Metadata
  license             String?
  readmeUrl           String?
  
  // Trust signals
  isVerified          Boolean  @default(false) // manual verification
  verificationStatus  String   @default("pending") // pending, verified, rejected
  
  // Creator-provided disclosures
  disclosureChecklist Json?    // { dataHandling: bool, privacy: bool, ... }
  evaluationSummaryUrl String? // optional link to evaluation
  
  // Backend-derived reputation
  usageCount          Int      @default(0)
  aggregateScore      Float?   // calculated from various signals
  
  // Status
  status              String   @default("published") // published, flagged, suspended
  featured            Boolean  @default(false) // algorithmically determined
  isFlagged           Boolean  @default(false) // has active flags (ranking penalty)
  flagCount           Int      @default(0) // number of active flags
  
  // Timestamps
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  publishedAt         DateTime?
  
  // Relations
  creatorId           String
  creator             User     @relation(fields: [creatorId], references: [id])
  
  @@index([slug])
  @@index([status])
  @@index([featured, aggregateScore])
  @@index([category])
  @@index([tags])
}

// Agent flags (for community moderation)
model AgentFlag {
  id          String   @id @default(cuid())
  agentId     String
  agent       Agent    @relation(fields: [agentId], references: [id], onDelete: Cascade)
  flaggedBy   String?  // userId (nullable for anonymous flags)
  reason      String   // "spam", "malicious", "broken", "license", "other"
  description String?
  status      String   @default("pending") // pending, reviewed, resolved, dismissed
  reviewedBy  String?  // userId (admin)
  reviewedAt  DateTime?
  createdAt   DateTime @default(now())
  
  @@index([agentId])
  @@index([status])
}

// Usage tracking (for reputation scoring)
model AgentUsage {
  id        String   @id @default(cuid())
  agentId   String
  agent     Agent    @relation(fields: [agentId], references: [id])
  userId    String?  // nullable for anonymous usage
  action    String   // "view", "try", "install"
  createdAt DateTime @default(now())
  
  @@index([agentId])
  @@index([createdAt])
}
```

### 4.2 Admin Review Analysis

**Arguments FOR Admin Review:**
- **Quality Control**: Prevents spam, malicious code, and obviously broken agents
- **Standards Enforcement**: Ensures AgentHub interface compliance before publication
- **Platform Reputation**: Curated catalog maintains trust and quality perception
- **Security**: Can catch security issues before public exposure
- **Legal Protection**: Review can check for license violations or problematic content

**Arguments AGAINST Admin Review (GitHub Model):**
- **Friction**: Reduces contribution velocity and enthusiasm (maintenance burden on creators)
- **Scalability**: Manual review doesn't scale—becomes bottleneck as platform grows
- **Bias**: Human reviewers may have unconscious biases about what's "good"
- **Delayed Value**: Time-to-publication is slow (days/weeks), losing momentum
- **GitHub Proof**: GitHub works fine without pre-approval—quality surfaces naturally through usage and community signals
- **Self-Moderation**: Community can flag/report issues; quality signals (usage, ratings) naturally surface good agents
- **Automated Validation**: Technical checks (agent.py, agent.yaml) can be automated; don't need humans for compliance

**Decision: Open Publishing Model (GitHub-like)**

AgentHub will use **open publishing** with **quality-based discovery**:
- ✅ Immediate publication upon successful validation (no admin gate)
- ✅ Automated technical validation (agent.py, agent.yaml presence and structure)
- ✅ Quality-based ranking (trust signals, usage, evaluations determine visibility)
- ✅ Community moderation (flag/report for abuse; post-publication review only if needed)
- ✅ Low visibility for low-quality agents (still discoverable but not featured)

### 4.3 Data Flow (Modified - Open Publishing)

**Agent Submission Flow (Immediate Publication):**
1. User submits repository URL via `/api/publish`
2. **Automated Validation** (blocks publication if failed):
   - Repository exists and is accessible (GitHub API check)
   - Repository is public (or user has access)
   - `agent.py` file exists in repository root or specified path
   - `agent.yaml` file exists in repository root or specified path
   - `agent.yaml` is valid YAML format
   - `agent.yaml` contains required fields: `name`, `version`, `description`
   - `agent.py` is syntactically valid Python (basic syntax check)
3. **Metadata Extraction** (from agent.yaml):
   - Extract: name, version, description, inputs/outputs, dependencies, license
   - Store: repoOwner, repoName, repoBranch
   - Set: agentPyPath, agentYamlPath
4. **If validation passes**: **Immediate publication**
   - Creates `Agent` record with status="published", `publishedAt` = now
   - Sets `hasValidInterface = true`
   - Calculates initial `aggregateScore` (based on available signals)
5. **If validation fails**: Returns errors, agent not created
6. Agent appears in marketplace immediately (may be low-ranked if lacking signals)

**Validation Rules (Required for Publication):**

| Check | Type | Failure Action |
|-------|------|---------------|
| Repository exists | Required | Reject: "Repository not found or inaccessible" |
| Repository is public | Required | Reject: "Repository must be public" |
| `agent.py` exists | Required | Reject: "agent.py not found in repository" |
| `agent.yaml` exists | Required | Reject: "agent.yaml not found in repository" |
| `agent.yaml` is valid YAML | Required | Reject: "agent.yaml is not valid YAML" |
| `agent.yaml` has `name` field | Required | Reject: "Missing required field: name" |
| `agent.yaml` has `version` field | Required | Reject: "Missing required field: version" |
| `agent.yaml` has `description` field | Required | Reject: "Missing required field: description" |
| `agent.py` is valid Python syntax | Required | Reject: "agent.py has syntax errors" |
| `agent.yaml` has `inputs/outputs` | Optional | Warning only, agent still published |
| `agent.yaml` has `dependencies` | Optional | Warning only, agent still published |
| `agent.yaml` has `license` | Optional | Warning only, agent still published |

**Validation Process:**
```
1. GitHub API: Fetch repository info → Check exists, public, accessible
2. GitHub API: List files in repo → Find agent.py and agent.yaml
3. GitHub API: Fetch agent.yaml content → Parse YAML
4. Validate YAML structure → Check required fields
5. GitHub API: Fetch agent.py content → Basic syntax check (ast.parse)
6. If all checks pass → Publish immediately
7. If any check fails → Return detailed error list, do not publish
```

**What Validation DOES:**
- ✅ Ensures AgentHub interface standard is met (agent.py + agent.yaml exist)
- ✅ Ensures basic file structure is correct (valid YAML, valid Python syntax)
- ✅ Ensures minimum metadata is present (name, version, description)
- ✅ Ensures repository is accessible (public or user has access)

**What Validation DOES NOT do:**
- ❌ Does NOT check if agent actually works/runs correctly
- ❌ Does NOT check code quality or best practices
- ❌ Does NOT check if agent is useful or valuable
- ❌ Does NOT check if documentation is complete
- ❌ Does NOT check for security vulnerabilities
- ❌ Does NOT require admin approval

**Why This Approach:**
- Technical compliance is automated (can be validated without humans)
- Quality and usefulness are determined by community (usage, evaluations, reviews)
- Prevents broken/spam submissions while keeping friction low
- Aligns with GitHub model: technical standards enforced, quality emerges organically

**Quality-Based Ranking (No Admin Gate):**
- High-quality agents (verified, evaluations, usage) → Top positions
- New/unverified agents → Lower positions, still discoverable
- Poor-quality agents → Bottom of results, less visible but not hidden
- Algorithm naturally surfaces quality over time

**Community Moderation (Post-Publication):**
- Users can flag agents for: spam, malicious code, broken functionality, license violations
- Flagged agents get reviewed (admin intervention only when needed)
- Repeat offenders can be suspended (same as GitHub)

**Agent Discovery Flow:**
1. User visits `/marketplace`
2. Frontend calls `/api/agents?filter=...&sort=...`
3. Backend queries database with filters/sorting
4. Calculates aggregate scores on-the-fly (or cached)
5. Returns ranked list
6. Frontend displays with trust badges

**Ranking Algorithm (Quality-Based, No Admin Gate):**
```
baseScore = 
  // Trust signals (can be achieved by anyone, not admin-gated)
  (isVerified ? 20 : 0) +                    // Self-verification or automated check
  (evaluationSummaryUrl ? 15 : 0) +          // Creator-provided
  (disclosureChecklist completeness * 10) +  // Creator-provided
  (hasValidInterface ? 15 : 0) +              // Automated validation
  
  // Usage signals (community-driven)
  (usageCount / maxUsage) * 25 +             // Natural adoption
  (timeSincePublish < 7 days ? -5 : 0) +     // New agents start lower
  
  // Quality signals
  (featured ? 10 : 0)                        // Algorithmically featured (high score agents)

penalties = 
  (isFlagged ? 50 : 0) +                     // Penalty for flagged content
  (flagCount * 5)                            // Additional penalty per flag

aggregateScore = baseScore - penalties

// Featured = aggregateScore > threshold (e.g., 60/100)
// Top positions in marketplace = sort by aggregateScore DESC
```

## 5. API Design

### 5.1 API Routes Structure

```
/api
  /auth
    /[...nextauth]         # NextAuth.js handler
    /session               # GET - get current session
  
  /agents
    GET  /                 # List agents (with filters, sorting, pagination)
    GET  /[slug]           # Get agent details
    GET  /[slug]/usage     # Get usage stats (optional)
    POST /[slug]/flag      # Flag agent for moderation (community reporting)
  
  /publish
    POST /submit           # Submit agent (immediate publication if valid)
    GET  /validate         # Validate repo before submission (optional pre-check)
    GET  /checklist        # Get submission checklist (static)
  
  /search
    GET  /                 # Search agents (full-text search)
  
  /github
    POST /validate-repo   # Validate repository and extract metadata
    GET  /repo-info        # Get repository info (for publish form)
```

### 5.2 API Specifications

#### GET /api/agents

**Query Parameters:**
- `category` (string, optional): Filter by category/domain
- `tags` (string[], optional): Filter by capabilities
- `verified` (boolean, optional): Filter verified agents only
- `hasEvaluation` (boolean, optional): Filter agents with evaluation
- `sort` (string, optional): `popular`, `newest`, `score`
- `page` (number, optional): Pagination
- `limit` (number, optional): Items per page

**Response:**
```typescript
{
  agents: Array<{
    id: string
    slug: string
    name: string
    description: string
    category: string
    tags: string[]
    repoUrl: string
    creator: {
      githubUsername: string
      githubAvatar: string
    }
    isVerified: boolean
    evaluationSummaryUrl: string | null
    usageCount: number
    aggregateScore: number
    featured: boolean
    createdAt: string
  }>
  total: number
  page: number
  limit: number
}
```

#### GET /api/agents/[slug]

**Response:**
```typescript
{
  id: string
  slug: string
  name: string
  description: string
  version: string
  category: string
  tags: string[]
  repoUrl: string
  repoOwner: string
  repoName: string
  license: string | null
  readmeUrl: string | null
  agentPyPath: string | null
  agentYamlPath: string | null
  isVerified: boolean
  verificationStatus: string
  disclosureChecklist: object | null
  evaluationSummaryUrl: string | null
  usageCount: number
  aggregateScore: number | null
  featured: boolean
  creator: {
    githubUsername: string
    githubAvatar: string
    displayName: string | null
  }
  createdAt: string
  publishedAt: string | null
}
```

#### POST /api/publish/submit

**Authentication:** Required (GitHub OAuth)

**Request Body:**
```typescript
{
  repoUrl: string
  category?: string
  tags?: string[]
  disclosureChecklist?: {
    dataHandling: boolean
    privacy: boolean
    security: boolean
    // ... other checklist items
  }
  evaluationSummaryUrl?: string
}
```

**Response:**
```typescript
{
  agentId: string
  slug: string
  status: "published" | "validation_failed"
  publishedAt: string | null
  message: string
  errors?: string[] // if validation failed
}
```

**Validation Steps (All Must Pass for Publication):**
1. **Repository Validation:**
   - Repository exists and is accessible via GitHub API
   - Repository is public (or authenticated user has access)
   - User has permission to publish this repository (is owner/collaborator)

2. **File Existence Validation:**
   - `agent.py` exists in repository (checks root directory, or specified path)
   - `agent.yaml` exists in repository (checks root directory, or specified path)

3. **File Content Validation:**
   - `agent.yaml` is valid YAML format (can be parsed)
   - `agent.yaml` contains required fields: `name`, `version`, `description`
   - `agent.py` is valid Python syntax (basic AST parsing check)

**Behavior:**
- Runs all validation checks sequentially
- If all checks pass: **immediately publishes** agent (status="published", publishedAt=now)
- If any check fails: returns detailed error list in response, agent not created
- No admin approval required—publication is automatic if all technical requirements met
- Optional fields (inputs/outputs, dependencies, license) missing = warning only, still publishes

#### POST /api/agents/[slug]/flag

**Authentication:** Optional (authenticated users get priority, anonymous flags allowed)

**Request Body:**
```typescript
{
  reason: "spam" | "malicious" | "broken" | "license" | "other"
  description?: string
}
```

**Response:**
```typescript
{
  flagId: string
  status: "pending"
  message: string
}
```

**Behavior:**
- Creates flag record for post-publication moderation
- Flagged agents get negative ranking penalty (isFlagged = true)
- Admin reviews flags later (not blocking publication)
- Multiple flags from different users increase priority

#### POST /api/github/validate-repo

**Purpose:** Pre-validation endpoint (optional - users can check repo before submitting)

**Request Body:**
```typescript
{
  repoUrl: string
  branch?: string
}
```

**Response:**
```typescript
{
  valid: boolean
  hasAgentPy: boolean
  hasAgentYaml: boolean
  agentPyPath: string | null
  agentYamlPath: string | null
  metadata: {
    name?: string
    version?: string
    description?: string
    // ... from agent.yaml
  } | null
  errors: string[]
  warnings: string[] // optional fields missing
}
```

**Validation Checks (Same as `/api/publish/submit`):**
- Repository exists and is accessible
- Repository is public
- `agent.py` exists
- `agent.yaml` exists
- `agent.yaml` is valid YAML
- `agent.yaml` has required fields (name, version, description)
- `agent.py` is valid Python syntax

**Use Case:** Allow users to validate their repository before submitting the full publish form

## 6. Implementation Phases

### Phase 0: Foundation (Week 1-2)

**Goal:** Set up backend infrastructure and basic data layer

**Tasks:**
1. Set up database (Vercel Postgres or Supabase)
2. Initialize Prisma with schema
3. Create database migrations
4. Set up environment variables
5. Configure NextAuth.js with GitHub OAuth
6. Create basic API route structure

**Deliverables:**
- Working database with schema
- Authentication flow (sign in with GitHub)
- Basic API routes returning mock data

### Phase 1: Core Backend (Week 2-3)

**Goal:** Implement agent CRUD and open publishing flow

**Tasks:**
1. Implement `/api/agents` GET endpoints (list, detail)
2. Implement `/api/publish/submit` POST endpoint (immediate publication)
3. Implement `/api/github/validate-repo` endpoint
4. GitHub repository validation logic (automated)
5. Agent.yaml parsing and validation logic
6. Quality-based ranking algorithm (no admin gate)
7. Agent flagging system (community moderation)

**Deliverables:**
- Working agent submission flow (immediate publication)
- Agent listing with filters and quality-based ranking
- Automated validation (agent.py, agent.yaml)
- Community flagging system

### Phase 2: Frontend Integration (Week 3-4)

**Goal:** Connect frontend to backend APIs

**Tasks:**
1. Create React hooks for API calls (`useAgents`, `useAgent`, `usePublish`)
2. Update marketplace page to fetch from API
3. Update agent detail pages to fetch from API
4. Implement publish form with validation
5. Add loading states and error handling
6. Add trust signal badges to UI
7. Implement search functionality

**Deliverables:**
- Functional marketplace with real data
- Working publish/submission form
- Trust badges and verification indicators

### Phase 3: Polish & Optimization (Week 4-5)

**Goal:** Performance, caching, and UX improvements

**Tasks:**
1. Implement caching strategy (Redis or Vercel Edge Config)
2. Add pagination to marketplace
3. Optimize database queries with indexes
4. Add usage tracking
5. Improve ranking algorithm with usage data
6. Add admin dashboard (basic) for flag review (post-publication moderation)
7. Add error boundaries and better error messages
8. SEO optimization
9. Implement agent flagging UI (report functionality)

**Deliverables:**
- Fast, optimized marketplace
- Usage tracking working
- Community moderation system (flag review)
- Production-ready MVP with open publishing

## 7. File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── agents/
│   │   │   ├── route.ts              # GET /api/agents
│   │   │   └── [slug]/
│   │   │       └── route.ts          # GET /api/agents/[slug]
│   │   ├── publish/
│   │   │   ├── submit/
│   │   │   │   └── route.ts          # POST /api/publish/submit
│   │   │   └── status/
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   └── github/
│   │       └── validate-repo/
│   │           └── route.ts
│   ├── marketplace/
│   │   └── page.tsx                  # Updated with API calls
│   ├── agents/
│   │   └── [slug]/
│   │       └── page.tsx              # Updated with API calls
│   └── publish/
│       └── page.tsx                  # Functional form
├── components/
│   ├── AgentCard.tsx                 # Updated with trust badges
│   ├── AgentDetail.tsx               # New component
│   ├── PublishForm.tsx               # New component
│   └── TrustBadge.tsx                # New component
├── lib/
│   ├── db/
│   │   └── prisma.ts                 # Prisma client
│   ├── api/
│   │   ├── agents.ts                 # Agent API client
│   │   ├── publish.ts                # Publish API client
│   │   └── github.ts                 # GitHub API client
│   ├── services/
│   │   ├── agent-service.ts          # Agent business logic
│   │   ├── ranking-service.ts        # Ranking algorithm
│   │   └── github-service.ts         # GitHub repo validation
│   ├── hooks/
│   │   ├── useAgents.ts              # React hook for agents
│   │   ├── useAgent.ts               # React hook for single agent
│   │   └── usePublish.ts             # React hook for publishing
│   └── utils/
│       ├── agent-yaml-parser.ts      # Parse agent.yaml
│       └── validation.ts             # Zod schemas
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── types/
    └── agent.ts                       # TypeScript types
```

## 8. Security Considerations

### 8.1 Authentication & Authorization
- GitHub OAuth via NextAuth.js (secure token handling)
- API routes protected with session checks
- Only authenticated users can submit agents
- Admin-only routes for review workflow

### 8.2 Data Validation
- Zod schemas for all API inputs
- Repository URL validation (must be GitHub, public repo)
- Rate limiting on submission endpoints
- Input sanitization for user-provided content

### 8.3 Repository Security
- Validate repository exists and is accessible
- Check for agent.py/agent.yaml in repository
- Parse agent.yaml safely (prevent code injection)
- Store only metadata, not agent code

## 9. Scalability Considerations

### 9.1 Database
- Indexes on frequently queried fields (slug, status, category, tags)
- Pagination for large result sets
- Connection pooling (Prisma handles this)

### 9.2 Caching
- Cache agent listings (Redis or Edge Config)
- Cache repository validation results
- Cache GitHub API responses
- Invalidate cache on agent updates

### 9.3 API Performance
- Optimize database queries (avoid N+1)
- Use database views for complex rankings (future)
- Consider full-text search (PostgreSQL tsvector) for search

### 9.4 Future Migration Path
- Can extract API routes to separate service (API Gateway pattern)
- Can add message queue for async processing (agent validation)
- Can add CDN for static assets
- Can migrate to microservices if needed (keep simple for MVP)

## 10. Success Metrics Tracking

### 10.1 Implementation Metrics
- API response times (< 200ms for listing, < 100ms for detail)
- Database query performance
- Error rates (< 1%)
- Uptime (99%+)

### 10.2 Business Metrics (to be tracked)
- Agent submissions per week
- Approval rate
- Agent discovery (searches, filters used)
- Usage tracking (views, installs)

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub API rate limiting | High | Cache GitHub responses, batch requests, handle errors gracefully |
| Database performance | Medium | Add indexes, implement caching, pagination |
| Agent validation complexity | Medium | Start with simple validation, iterate based on edge cases |
| OAuth complexity | Low | Use NextAuth.js (handles complexity) |
| Scalability concerns | Low (MVP) | Architecture supports scaling, but optimize for MVP first |

## 12. Key Design Decisions

### 12.1 Open Publishing Model

**Decision:** Agents publish immediately upon technical validation (no admin review gate).

**Rationale:**
- Aligns with GitHub model: anyone can publish, quality determines visibility
- Removes friction and encourages contribution
- Scales automatically (no human bottleneck)
- Quality signals (usage, evaluations, trust badges) naturally surface good agents

**Trade-offs:**
- Lower-quality agents may be published (mitigated by ranking algorithm)
- Need robust automated validation and community moderation
- Initial catalog may have more noise (but sorting/ranking handles this)

### 12.2 Quality-Based Discovery

**Decision:** Ranking algorithm determines visibility, not approval status.

**How it works:**
- All published agents are discoverable
- Top positions: high aggregateScore agents (verified, evaluations, usage)
- Low positions: new/unverified agents or low-quality agents
- Search/filters allow finding agents regardless of rank
- Featured badge: algorithmically assigned (high score threshold)

**Benefits:**
- Meritocratic: quality agents rise to top naturally
- Inclusive: anyone can publish, not gatekept by reviewers
- Transparent: ranking is formulaic, not subjective

## 13. Next Steps

1. **Review & Approval:** Get stakeholder approval on this design (especially open publishing model)
2. **Environment Setup:** Set up database, GitHub OAuth app, environment variables
3. **Phase 0 Kickoff:** Begin foundation phase
4. **Weekly Reviews:** Track progress against phases

---

**Document Status:** Ready for review and implementation kickoff.  
**Last Updated:** 2025-06-28 - Modified to use open publishing model (GitHub-like, no admin review gate)

