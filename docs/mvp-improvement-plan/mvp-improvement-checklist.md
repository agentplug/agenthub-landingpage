## MVP Improvement Checklist

This document captures follow-up items identified during the implementation design review. Each item should be converted to work items or issues as appropriate once scoped.

### 1. Security Hardening
- Define an execution sandbox or containerization plan for running contributed agents.
- Document rate-limiting thresholds per API endpoint and outline DDoS mitigation.
- Expand input validation guidelines beyond Zod usage (e.g., sanitization, allow-lists).
- Plan for dependency and vulnerability scanning across the codebase and agent submissions.

### 2. Monitoring & Observability
- Specify logging, metrics, and tracing tools (e.g., Vercel Analytics, Sentry).
- Define alert thresholds for critical services (API latency, error rate, GitHub API failures).
- Create a dashboard for real-time health monitoring of publishing and marketplace flows.

### 3. Testing Strategy
- Outline unit, integration, and end-to-end testing requirements for core workflows.
- Establish test coverage targets and CI enforcement rules.
- Include testing of validation rules with representative agent repositories.

### 4. Deployment & Operations
- Document the CI/CD pipeline, including migration handling and rollback procedures.
- Add a production readiness checklist (env vars, backups, error tracking, SEO checks).
- Clarify environment promotion flow (development → staging → production).

### 5. Edge Case Handling
- Define behavior when agent repositories are renamed, deleted, or made private post-publication.
- Decide on a versioning strategy for agents (even if deferred beyond MVP).
- Specify policies for resolving slug collisions or repo ownership changes.

### 6. Data & Ranking Enhancements
- Plan background jobs or materialized views for recalculating `aggregateScore` at scale.
- Document recalculation cadence and cache invalidation strategy for ranking data.
- Explore additional trust and quality signals for future iterations.

### 7. Documentation System
- Clarify scope and tooling for the “minimal but solid” AgentHub library documentation in MVP.
- Determine hosting location and integration with the platform (e.g., docs subdomain).
- Provide contribution guidelines for documentation updates.

---

**Next Steps:** Review, prioritize, and create implementation tickets aligned with the MVP timeline.

