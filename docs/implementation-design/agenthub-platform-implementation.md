# AgentHub Platform Implementation Design

**Document Type**: Implementation Design  
**Author**: William  
**Date Created**: 2025-06-28  
**Last Updated**: 2025-06-28  
**Status**: Draft  
**Related Documents**: 
- `docs/requirement-analysis/agenthub-requirement-analysis.md` - Business requirements
- `docs/implementation-design/agenthub-platform-prd.md` - Product requirements and features

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Key Concepts & Terminology](#2-key-concepts--terminology)
3. [System Architecture & Technology Stack](#3-system-architecture--technology-stack)
4. [Data Models & Database](#4-data-models)
5. [Core Workflows](#5-core-workflows)
6. [API Design](#6-api-design)
7. [Implementation Phases](#7-implementation-phases)
8. [File Structure](#8-file-structure)
9. [Security Considerations](#9-security-considerations)
10. [Scalability Considerations](#10-scalability-considerations)
11. [Success Metrics Tracking](#11-success-metrics-tracking)
12. [Risks & Mitigations](#12-risks--mitigations)
13. [Key Design Decisions](#13-key-design-decisions)
14. [Next Steps](#14-next-steps)

---

## 1. Executive Summary

This document explains **how** to build the AgentHub marketplace platform. It transforms the existing landing page (which only has a UI) into a fully functional platform where users can discover and publish AI agents.

### What This Document Covers

- **Architecture**: How the system is structured (frontend, backend, database)
- **Technology Choices**: What tools and frameworks we'll use and why
- **Data Models**: What information we store and how it's organized
- **Workflows**: How key features work (publishing agents, ranking, discovery)
- **API Design**: How different parts of the system communicate
- **Implementation Plan**: Step-by-step guide to building the platform

### Key Design Principles

1. **Start Simple**: Use Next.js API routes (no separate backend initially) - easy to start, can scale later
2. **Open Publishing**: Like GitHub - anyone can publish if they meet technical requirements
3. **Quality-Based Discovery**: Good agents rise to the top through usage and trust signals, not manual curation
4. **Automated Validation**: Technical checks ensure agents follow standards, no human review needed

> **Note:** For **what** features to build (product requirements), see: [`docs/implementation-design/agenthub-platform-prd.md`](./agenthub-platform-prd.md)

---

## 2. Key Concepts & Terminology

Before diving into technical details, here are important concepts explained in simple terms:

### What is AgentHub?

AgentHub is like **GitHub, but for AI agents**. Just as GitHub hosts code repositories, AgentHub hosts AI agents built to a standard interface.

### Key Terms

**Agent**: An AI agent is a program that can perform tasks. In AgentHub, agents must follow a specific format:
- Must have `agent.py` (the actual code)
- Must have `agent.yaml` (description and metadata)
- Must follow the AgentHub command-line interface (CLI) pattern

**Open Publishing**: Like GitHub, anyone can publish agents immediately if they meet technical requirements. No waiting for human approval.

**Quality-Based Ranking**: Instead of manual curation, agents are ranked automatically based on:
- Trust signals (verification, evaluations, disclosures)
- Usage (how many people use the agent)
- Community feedback (flags for problematic agents)

**Validation**: Before an agent can be published, the system automatically checks:
- Does the repository exist and is it accessible?
- Are the required files (`agent.py`, `agent.yaml`) present?
- Do the files follow the correct format?
- Is the code syntactically correct?

**Trust Signals**: Indicators that help users trust an agent:
- ✅ **Verified Badge**: Agent passed automated technical validation
- ✅ **Evaluation Badge**: Creator provided external evaluation results
- ✅ **Featured Badge**: Algorithm determined this is a high-quality agent
- ✅ **Usage Stats**: How many people have used this agent

### Technical Terms (Simplified)

- **API Routes**: Backend endpoints that handle requests (like "get list of agents" or "publish new agent")
- **Database**: Stores all agent information, user accounts, usage stats, etc.
- **ORM (Prisma)**: A tool that makes database operations easier and type-safe
- **OAuth**: Allows users to sign in with their GitHub account
- **Serverless**: Code runs in the cloud automatically, scales based on usage

---

## 3. System Architecture & Technology Stack

This section explains how the platform is structured, what technologies we use, and why we made these choices.

### 3.1 High-Level Architecture

The platform is organized into three main layers that work together:

```
┌─────────────────────────────────────────┐
│   User Interface (Frontend)             │
│   - React components and pages          │
│   - What users see and interact with    │
└─────────────────────────────────────────┘
              ↕ (HTTP Requests)
┌─────────────────────────────────────────┐
│   API Layer (Backend Logic)             │
│   - Business logic and validation       │
│   - Handles requests and processes data │
└─────────────────────────────────────────┘
              ↕ (Database Queries)
┌─────────────────────────────────────────┐
│   Data Storage (Database)               │
│   - Stores agents, users, stats         │
│   - PostgreSQL database                 │
└─────────────────────────────────────────┘
```

### 3.2 How It Works: Request Flow

Here's how a typical user interaction flows through the system:

**Example: User Views Marketplace**

1. **User visits `/marketplace`** → Browser loads the frontend page
2. **Frontend requests agent list** → `fetch('/api/agents')`
3. **API route receives request** → `app/api/agents/route.ts` runs
4. **Service layer processes** → Queries database, calculates rankings
5. **Database returns data** → List of agents with metadata
6. **API returns JSON** → Frontend receives agent data
7. **Frontend displays results** → User sees ranked list of agents

**Example: User Publishes Agent**

1. **User submits repository URL** → Frontend sends to `/api/publish/submit`
2. **API validates repository** → Checks files, format, permissions via GitHub API
3. **If valid** → Creates agent record in database, publishes immediately
4. **If invalid** → Returns error messages to user
5. **Frontend shows result** → Success message or error details

### 3.3 Detailed System Architecture

Here's the complete technical architecture with all components:

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

### 3.4 Technology Stack

#### Core Framework & Language

**Next.js (App Router)**
- **What it does**: Combines frontend (React) and backend (API routes) in one framework
- **Why we use it**: 
  - Single codebase for faster development
  - Built-in API routes (no separate backend needed)
  - Automatic code splitting and optimization
  - Server-side rendering for better performance
- **Benefits**: TypeScript support, hot reload, easy deployment

**TypeScript**
- **What it does**: Adds type checking to JavaScript
- **Why we use it**: Prevents bugs, better IDE support, easier refactoring

#### Database & Data Management

**PostgreSQL**
- **What it does**: Relational database that stores all platform data
- **Why we use it**:
  - Handles relationships well (User → Agent → Flags)
  - ACID compliance ensures data integrity
  - Powerful querying for search and filtering
  - Native JSON support for flexible metadata
- **Hosting options**: Vercel Postgres or Supabase (serverless PostgreSQL)

**Prisma ORM**
- **What it does**: Makes database operations easier and type-safe
- **Why we use it**:
  - Generates TypeScript types from database schema
  - Type-safe queries (catch errors before runtime)
  - Easy migrations (version-controlled schema changes)
  - Better developer experience (autocomplete, query builder)

#### Authentication & Security

**NextAuth.js (Auth.js)**
- **What it does**: Handles user authentication via GitHub OAuth
- **Why we use it**:
  - Native GitHub integration (minimal setup)
  - Secure session management
  - Built-in CSRF protection
  - Easy to add more providers later (GitLab, Bitbucket)

**Zod**
- **What it does**: Validates API input data at runtime
- **Why we use it**:
  - Prevents bad data from reaching database
  - Generates TypeScript types automatically
  - Human-readable error messages
  - Composable validation rules

#### Infrastructure & Hosting

**Vercel**
- **What it does**: Hosts and deploys the Next.js application
- **Why we use it**:
  - Built by Next.js creators (optimized for Next.js)
  - Zero configuration deployment
  - Automatic scaling (serverless functions)
  - Global CDN for fast loading
  - Preview deployments for testing

**Vercel Postgres or Supabase**
- **What it does**: Hosts PostgreSQL database
- **Why we use it**:
  - Serverless (auto-scales, pay per use)
  - No server management needed
  - Built-in backups
  - Connection pooling included

#### External Services

**GitHub API**
- **What it does**: Validates repositories and fetches metadata
- **Why we use it**: Agents are stored in GitHub repositories

**OAuth Provider (GitHub)**
- **What it does**: Allows users to sign in with GitHub account
- **Why we use it**: Users need GitHub accounts to publish agents

### 3.5 Architecture Principles

#### Simplicity First

**Start with Next.js API Routes**
- Frontend and backend in one codebase (easier for MVP)
- No separate backend service initially
- Can extract to separate service later if needed

**Why this approach?**
- **Faster development**: One deployment, shared types, no CORS issues
- **Cost-effective**: Serverless functions scale automatically, pay per use
- **Easy migration**: Can extract API routes to separate backend later

#### Maintainability

**Clear Separation of Concerns**
- API routes handle HTTP requests
- Service layer contains business logic
- Data layer handles database operations

**TypeScript Throughout**
- Type safety prevents errors
- Better IDE support
- Self-documenting code

#### Scalability

**Stateless API Design**
- Any serverless instance can handle any request
- Scales horizontally automatically
- No sticky sessions needed

**Database Indexing**
- Fast queries for search and filtering
- Indexes on frequently queried fields (slug, status, category)

**Caching Strategy**
- Cache read-heavy operations (agent listings)
- Reduce database load
- Faster response times

### 3.6 Why These Technology Choices?

#### For MVP (Minimum Viable Product)

1. **Speed**: Next.js API routes let us build faster (one codebase)
2. **Cost**: Serverless functions are cheap for low traffic (pay per use)
3. **Simplicity**: Less infrastructure to manage
4. **Type Safety**: TypeScript + Prisma catch errors early

#### Future Flexibility

- **Can extract backend**: API routes can become separate service
- **Can change hosting**: Database is standard PostgreSQL (can migrate)
- **Can add services**: Architecture supports microservices later

**The key insight**: Start simple, optimize later. These choices work great for MVP and don't lock us into anything.

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
  isVerified          Boolean  @default(false) // automated verification (all published agents are verified)
  verificationStatus  String   @default("verified") // verified (automated - all published agents), rejected (if validation fails)
  
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

## 5. Core Workflows

This section explains the key workflows: how agents are published, validated, and discovered.

### 5.1 Agent Publishing Workflow

**Publishing Flow (Immediate Publication):**

1. **User submits repository URL** → Frontend sends to `/api/publish/submit`
2. **Automated Validation** (all must pass):
   - Repository exists and is accessible via GitHub API
   - Repository is public (or user has access)
   - User has permission (owner/collaborator)
   - `agent.py` file exists (required file)
   - `agent.yaml` file exists (required file)
   - `agent.yaml` is valid YAML with required fields: `name`, `version`, `description`
   - `agent.py` is valid Python syntax
   - `agent.py` follows AgentHub CLI interface pattern
3. **Metadata Extraction** (if validation passes):
   - Extract metadata from `agent.yaml` (name, version, description, tags, license, etc.)
   - Store repository information (owner, name, branch, file paths)
4. **Immediate Publication** (if all validations pass):
   - Create `Agent` record in database with `status="published"`
   - Set `isVerified=true`, `verificationStatus="verified"`, `hasValidInterface=true`
   - Set `publishedAt` timestamp
   - Calculate initial `aggregateScore` (based on available signals)
   - Agent appears in marketplace immediately (may start with lower ranking)
5. **Error Response** (if validation fails):
   - Return detailed error messages
   - No agent record created
   - User can fix issues and resubmit

### 5.2 Agent Validation

**Critical Validations (Required - Blocks Publication):**
- Repository exists and is accessible via GitHub API
- Repository is public (or user has access)
- User has permission to publish (owner/collaborator)
- `agent.py` file exists in repository
- `agent.yaml` file exists in repository
- `agent.yaml` is valid YAML format
- `agent.yaml` has required fields: `name`, `version`, `description` (all non-empty)
- `agent.py` is valid Python syntax (AST parsing)
- `agent.py` follows AgentHub CLI interface pattern (JSON I/O via command-line)

**Optional Validations (Warnings Only):**
- Semantic versioning format
- Interface methods consistency between `agent.yaml` and `agent.py`
- Best practices (shebang, README.md)

**What Validation Does:**
- ✅ Ensures AgentHub interface standard compliance
- ✅ Prevents broken/malformed submissions
- ✅ Validates technical requirements only (not quality/usefulness)

**What Validation Does NOT Do:**
- ❌ Does NOT check if agent actually works/runs
- ❌ Does NOT check code quality or usefulness
- ❌ Does NOT require admin approval

*Note: Detailed validation rules and step-by-step process are documented in the PRD.*

### 5.3 Agent Discovery & Ranking

**Discovery Flow:**
1. User visits marketplace → Frontend requests agent list
2. Backend queries database with filters/sorting
3. Calculates aggregate scores for each agent
4. Returns ranked list sorted by `aggregateScore` (descending)
5. Frontend displays agents with trust badges

**Quality-Based Ranking Algorithm:**
```
baseScore = 
  // Trust signals (can be achieved by anyone, not admin-gated)
  (isVerified ? 20 : 0) +                    // Automated verification (GUARANTEED for all published agents)
  (evaluationSummaryUrl ? 15 : 0) +          // Creator-provided (optional)
  (disclosureChecklist completeness * 10) +  // Creator-provided (variable 0-10)
  (hasValidInterface ? 15 : 0) +            // Automated validation (GUARANTEED for all published agents)
  
  // Usage signals (community-driven)
  (usageCount / maxUsage) * 25 +             // Natural adoption (variable 0-25)
  (timeSincePublish < 7 days ? -5 : 0) +     // New agents start lower
  
  // Quality signals
  (featured ? 10 : 0)                        // Algorithmically featured (high score agents)

penalties = 
  (isFlagged ? 50 : 0) +                     // Penalty for flagged content
  (flagCount * 5)                            // Additional penalty per flag

aggregateScore = baseScore - penalties

// Featured = aggregateScore > threshold (e.g., 60/100)
// Top positions in marketplace = sort by aggregateScore DESC

// Note: Published agents have guaranteed 35-point baseline (isVerified: 20 + hasValidInterface: 15)
// This means new agents start at minimum 30 points (35 - 5 time penalty) before usage/evaluations
```

**Justification for Ranking Algorithm:**

**1. Trust Signals (50 points max):**
- **Verification (20 points)**: All published agents are verified (automated validation passed), so this is essentially a baseline bonus (guaranteed for all published agents). Kept in formula for clarity and future flexibility (if we add manual verification tiers).
- **Evaluation (15 points)**: Rewards transparency and third-party validation. Creator-provided evaluations show confidence and provide trust signals to users. Not guaranteed—only agents with evaluationSummaryUrl get this.
- **Disclosure Checklist (10 points)**: Encourages transparency about data handling, privacy, security. Completeness score based on filled items. Variable—agents with more complete disclosures score higher.
- **Valid Interface (15 points)**: All published agents have valid interface (required for publication), so this is guaranteed baseline bonus. Explicitly rewarded to ensure all published agents have this signal. **Note**: Together with verification, published agents have a guaranteed 35-point baseline (20 + 15).

**2. Usage Signals (25 points max):**
- **Usage Count (25 points)**: Normalized to highest usage agent. Reflects real-world adoption and value. Most powerful signal (highest weight) because usage = community validation.
- **Time Penalty (-5 points)**: Prevents new agents from immediately ranking high. Gives established agents advantage, but penalty is small (agents can still rank high if they have other signals).

**3. Quality Signals (10 points):**
- **Featured (10 points)**: Recursive signal—high-scoring agents get featured, which increases their score slightly. Creates positive feedback loop for quality agents.

**4. Penalties (unlimited):**
- **Flagged Penalty (50 points)**: Severe penalty for flagged agents (drops them significantly in rankings).
- **Flag Count (5 points per flag)**: Additional penalty per flag. Multiple flags indicate serious problems.
- **Why Unlimited Penalties**: Allows extremely problematic agents to have negative scores, ensuring they never surface in search results.

**5. Algorithm Design Principles:**
- **Transparent**: All signals are visible and achievable (no black-box admin decisions)
- **Community-Driven**: Usage is most powerful signal (community decides what's valuable)
- **Time-Weighted**: New agents start lower but can rise quickly with usage/evaluations
- **Defensive**: Penalties prevent bad actors from gaming the system
- **Balanced**: Multiple signal types prevent single-point-of-failure (can't game just one signal)

### 5.4 Community Moderation

**Flagging System:**
- Users can flag agents for: spam, malicious code, broken functionality, license violations
- Flagged agents receive ranking penalty (drops in search results)
- Multiple flags increase penalty severity
- Admin reviews flags post-publication (reactive moderation)
- Repeat offenders can be suspended

---

## 6. API Design

### 6.1 API Routes Structure

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

**Justification for API Design:**

**1. RESTful Structure:**
- **Clear Resource Hierarchy**: `/agents/[slug]` follows REST conventions (resources are nouns, actions are verbs via HTTP methods)
- **Predictable URLs**: Developers can easily understand and use the API
- **Stateless**: Each request contains all information needed (no server-side session state)

**2. Separation of Concerns:**
- **`/auth`**: Authentication is isolated, can be swapped or extended easily (add more providers)
- **`/agents`**: Core marketplace functionality (listing, details, flags)
- **`/publish`**: Publishing workflow (submit, validate, checklist)
- **`/search`**: Search functionality (can be separate service later, or database full-text search)
- **`/github`**: GitHub integration (can be replaced with other git providers later)

**3. API Design Decisions:**

**POST /publish/submit (not `/agents`)**
- **Justification**: Publishing is a workflow, not a direct resource creation. Separates concerns: agents are read-only resources (marketplace), publishing is a mutation workflow. Makes it clear that this endpoint does more than just create an agent (validation, metadata extraction, ranking calculation).

**POST /agents/[slug]/flag (not `/flags`)**
- **Justification**: Flags are tightly coupled to agents (always flagged "on" an agent). Nested route makes the relationship clear and follows REST nested resource pattern. Also ensures the agent exists before allowing flag creation.

**GET /github/validate-repo (separate from `/publish/validate`)**
- **Justification**: This endpoint can be used independently (pre-validation before filling form). Also keeps GitHub-specific logic separate (could support other git providers later). Returns raw GitHub API data + validation results.

**4. API Versioning:**
- **Not included in MVP**: Simple `/api/...` structure is sufficient for MVP
- **Future-proofing**: Can add `/api/v2/...` later if breaking changes needed
- **No breaking changes expected**: API designed to be extensible (optional fields, backward-compatible additions)

### 6.2 API Specifications

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

**Response (Success - Validation Passed):**
```typescript
{
  agentId: string
  slug: string
  status: "published"
  publishedAt: string
  message: string
}
```

**Response (Error - Validation Failed):**
```typescript
{
  status: "validation_failed"
  message: string
  errors: string[] // detailed validation errors
  // agentId, slug, publishedAt not present (agent not created)
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
- If all checks pass: **immediately publishes** agent
  - Creates Agent record with status="published", publishedAt=now
  - Sets isVerified=true, verificationStatus="verified", hasValidInterface=true
  - Returns success response with agentId, slug, publishedAt
- If any check fails: returns error response with validation errors, agent not created
  - Returns error response with status="validation_failed" and errors array
  - No agent record is created in database
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

## 7. Implementation Phases

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

## 8. File Structure

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

## 9. Security Considerations

### 9.1 Authentication & Authorization
- GitHub OAuth via NextAuth.js (secure token handling)
- API routes protected with session checks
- Only authenticated users can submit agents
- Admin-only routes for review workflow

### 9.2 Data Validation
- Zod schemas for all API inputs
- Repository URL validation (must be GitHub, public repo)
- Rate limiting on submission endpoints
- Input sanitization for user-provided content

### 9.3 Repository Security
- Validate repository exists and is accessible
- Check for agent.py/agent.yaml in repository
- Parse agent.yaml safely (prevent code injection)
- Store only metadata, not agent code

## 10. Scalability Considerations

### 10.1 Database
- Indexes on frequently queried fields (slug, status, category, tags)
- Pagination for large result sets
- Connection pooling (Prisma handles this)

### 10.2 Caching
- Cache agent listings (Redis or Edge Config)
- Cache repository validation results
- Cache GitHub API responses
- Invalidate cache on agent updates

### 10.3 API Performance
- Optimize database queries (avoid N+1)
- Use database views for complex rankings (future)
- Consider full-text search (PostgreSQL tsvector) for search

### 10.4 Future Migration Path
- Can extract API routes to separate service (API Gateway pattern)
- Can add message queue for async processing (agent validation)
- Can add CDN for static assets
- Can migrate to microservices if needed (keep simple for MVP)

## 11. Success Metrics Tracking

### 11.1 Implementation Metrics
- API response times (< 200ms for listing, < 100ms for detail)
- Database query performance
- Error rates (< 1%)
- Uptime (99%+)

### 11.2 Business Metrics (to be tracked)
- Agent submissions per week
- Approval rate
- Agent discovery (searches, filters used)
- Usage tracking (views, installs)

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub API rate limiting | High | Cache GitHub responses, batch requests, handle errors gracefully |
| Database performance | Medium | Add indexes, implement caching, pagination |
| Agent validation complexity | Medium | Start with simple validation, iterate based on edge cases |
| OAuth complexity | Low | Use NextAuth.js (handles complexity) |
| Scalability concerns | Low (MVP) | Architecture supports scaling, but optimize for MVP first |

## 13. Key Design Decisions

### 13.1 Open Publishing Model

**Decision:** Agents publish immediately upon technical validation (no admin review gate).

**Why We Chose This:**
- **Proven Success**: GitHub demonstrates open publishing works at scale (millions of repos)
- **Scalability**: Automated validation handles thousands of submissions; manual review becomes bottleneck
- **Community-Driven Quality**: Usage signals and evaluations naturally surface good agents
- **Low Friction**: Immediate publication encourages contributions and experimentation
- **Technical Validation is Sufficient**: Automated checks ensure interface compliance; quality is subjective

**How It Works:**
- Immediate publication upon successful validation (no waiting period)
- Automated technical validation (agent.py, agent.yaml compliance)
- Quality-based ranking (trust signals, usage, evaluations determine visibility)
- Community moderation (flag/report for abuse; post-publication review only if needed)
- Low visibility for low-quality agents (still discoverable but not featured)

**Trade-offs:**
- Lower-quality agents may be published (mitigated by ranking algorithm)
- Need robust automated validation and community moderation
- Initial catalog may have more noise (but sorting/ranking handles this)

### 13.2 Quality-Based Discovery

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

## 14. Next Steps

1. **Review & Approval:** Get stakeholder approval on this design (especially open publishing model)
2. **Environment Setup:** Set up database, GitHub OAuth app, environment variables
3. **Phase 0 Kickoff:** Begin foundation phase
4. **Weekly Reviews:** Track progress against phases

---

**Document Status:** Ready for review and implementation kickoff.  
**Last Updated:** 2025-06-28 - Modified to use open publishing model (GitHub-like, no admin review gate)

