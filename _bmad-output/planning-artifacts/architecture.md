---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation']
inputDocuments:
  - "prd.md"
  - "product-brief-orbitcrm-2026-01-16.md"
workflowType: 'architecture'
project_name: 'OrbitCRM'
user_name: 'Paulolopes'
date: '2026-01-16'
---

# Architecture Decision Document - OrbitCRM

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 58 FRs across 11 capability areas
- Authentication & User Management (7)
- Organization & Multi-Tenancy (4)
- Contact Management (7)
- Project Management (6)
- Task Management (6)
- AI Chat & Conversation (9)
- RAG & Knowledge Base (5)
- Directives & AI Behavior (4)
- Document Generation (3)
- Integrations & Actions (3)
- Billing & Subscriptions (4)

**Non-Functional Requirements:** 18 NFRs
- Performance: < 2s AI streaming, < 3s page load
- Security: AES-256, TLS 1.3, RLS
- Scalability: 10x growth with < 10% degradation
- Reliability: 99.5% uptime

### Scale & Complexity

- **Primary domain:** Full-stack SaaS with AI
- **Complexity level:** HIGH
- **Estimated architectural components:** 12+

### Architecture Decisions

#### Database Architecture
- **Decision:** Single Supabase PostgreSQL with pgvector
- **Vector storage:** pgvector extension (same DB)
- **File storage:** Supabase Storage

#### AI Provider Strategy
- **Primary:** User's selected model
- **Fallback:** GPT-4o Mini (cheapest)

#### Real-time Architecture
- **AI streaming:** Vercel AI SDK
- **CRM updates:** Supabase Realtime
- **Team notifications:** Supabase Realtime

#### Caching Strategy
- **User preferences:** React Query (1 hour TTL)
- **RAG embeddings:** PostgreSQL (permanent)
- **Contact/Project data:** React Query (5 min TTL)
- **AI responses:** Never cached

#### Background Jobs
- **Document chunking:** Edge Function (on upload)
- **Embedding generation:** Edge Function
- **Webhook retries:** Edge Function (cron)
- **Email sending:** Edge Function
- **Usage aggregation:** Postgres Trigger
- **Daily token reset:** Edge Function (cron)

#### API Architecture
- **Internal APIs:** tRPC (type-safe)
- **Webhook receivers:** Next.js API Routes
- **External webhooks:** Edge Functions

### Cross-Cutting Concerns

1. **Multi-tenancy** - RLS on ALL entities
2. **AI context propagation** - Context flows through all AI calls
3. **Token metering** - Track per request per model
4. **Real-time streaming** - AI responses stream to UI

---

## Starter Template Evaluation

### Primary Technology Domain

**Full-Stack SaaS with AI** - Next.js 15, TypeScript, tRPC, Supabase, Tailwind CSS, shadcn/ui

### Starter Options Considered

| Starter | Verdict |
|---------|---------|
| create-t3-app | ❌ Uses Prisma, not Supabase-native |
| create-next-app | ✅ Official, add incrementally |
| Supabase Template | ❌ Less opinionated on tRPC |

### Selected: Custom Scaffold based on create-next-app

**Rationale:** Supabase-first architecture with RLS requires native Supabase client, not ORM abstraction.

**Initialization Command:**

```bash
npx create-next-app@latest orbitcrm --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Incremental Additions:**
1. Supabase CLI + client
2. tRPC + React Query
3. shadcn/ui components
4. Vercel AI SDK
5. Stripe integration

### Architectural Decisions from Starter

| Decision | Value |
|----------|-------|
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui |
| **Routing** | Next.js App Router |
| **API** | tRPC |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth |
| **Deployment** | Vercel |

---

## Core Architectural Decisions

### Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Data Validation** | Zod | Type-safe, integrates with tRPC and RHF |
| **Schema Management** | Supabase Migrations | Native, versioned, CLI-based |
| **Query Client** | TanStack Query (React Query) | Caching, refetch, mutations |

### Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **State Management** | React Query + Zustand | Server state + client state separation |
| **Forms** | React Hook Form + Zod | Performant, type-safe validation |
| **Icons** | Lucide React | Modern, tree-shakable |
| **Animations** | Framer Motion | Declarative, powerful |

### Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Input Sanitization** | DOMPurify | Sanitize AI-generated HTML |
| **Rate Limiting** | Upstash Redis | Serverless-compatible |
| **Secrets** | Vercel env vars | Built-in, encrypted |

### Infrastructure

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Email** | Resend | Modern API, great DX |
| **Payments** | Stripe | Best-in-class, metered billing |
| **PDF Generation** | @react-pdf/renderer | React-native PDF creation |
| **Monitoring** | Vercel Analytics + Sentry | Performance + errors |

### Decision Summary

**Critical (Block Implementation):**
- Supabase PostgreSQL + pgvector
- Supabase Auth + RLS
- tRPC for API
- Stripe for billing

**Important (Shape Architecture):**
- React Query for server state
- Zustand for client state
- Framer Motion for animations
- Resend for email

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

#### Database Naming
| Pattern | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `users`, `projects`, `ai_conversations` |
| Columns | snake_case | `created_at`, `user_id`, `is_active` |
| Foreign Keys | `{table}_id` | `user_id`, `project_id` |
| Indexes | `idx_{table}_{columns}` | `idx_users_email` |

#### API/Code Naming
| Pattern | Convention | Example |
|---------|------------|---------|
| tRPC Procedures | camelCase | `getUser`, `createContact` |
| Components | PascalCase | `UserCard`, `AIChatPanel` |
| Files | kebab-case | `user-card.tsx`, `ai-chat-panel.tsx` |
| Variables | camelCase | `userId`, `currentProject` |

### Structure Patterns

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── [feature]/          # Feature components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── trpc/               # tRPC setup
│   └── utils/              # Shared utilities
├── server/
│   ├── routers/            # tRPC routers
│   └── services/           # Business logic
└── types/                  # Shared types
```

### Format Patterns

#### API Responses
```typescript
// Success response
{ data: T, error: null }

// Error response
{ data: null, error: { message: string, code: string } }
```

#### Dates
- Database: `timestamptz` (with timezone)
- API: ISO 8601 strings
- UI: User's local timezone

### Process Patterns

#### Error Handling
- tRPC error states for queries/mutations
- Toast notifications for user actions
- Sentry for unexpected errors

#### Loading States
- React Query `isLoading` / `isFetching`
- Skeleton components for initial load
- Spinner for mutations

### Enforcement Guidelines

**All AI Agents MUST:**
1. Use snake_case for database, camelCase for TypeScript
2. Use tRPC for all API calls
3. Use React Query for server state
4. Use Zustand for client-only state
5. Use Zod for all validation
6. Follow file naming conventions

---

## Project Structure & Boundaries

### Complete Project Tree

```
orbitcrm/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .github/workflows/ci.yml
├── supabase/
│   ├── config.toml
│   └── migrations/
│       ├── 001_users.sql
│       ├── 002_organizations.sql
│       ├── 003_contacts.sql
│       ├── 004_projects.sql
│       ├── 005_tasks.sql
│       ├── 006_ai_conversations.sql
│       ├── 007_documents.sql
│       └── 008_billing.sql
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/login/page.tsx, signup/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── contacts/, projects/, tasks/, chat/, documents/, settings/
│   │   └── api/
│   │       ├── trpc/[trpc]/route.ts
│   │       └── webhooks/stripe/route.ts
│   ├── components/
│   │   ├── ui/                    # shadcn/ui
│   │   ├── forms/, contacts/, projects/, tasks/, chat/, layout/
│   ├── lib/
│   │   ├── supabase/client.ts, server.ts, middleware.ts
│   │   ├── trpc/client.ts, server.ts, provider.tsx
│   │   ├── ai/providers.ts, context.ts
│   │   ├── stripe/client.ts
│   │   └── utils/cn.ts
│   ├── server/
│   │   ├── routers/_app.ts, contacts.ts, projects.ts, tasks.ts, chat.ts, billing.ts
│   │   └── services/ai-service.ts, rag-service.ts, email-service.ts
│   ├── stores/ui-store.ts
│   ├── types/index.ts
│   └── middleware.ts
├── tests/setup.ts, e2e/
└── public/assets/
```

### Requirements Mapping

| Module | Location | FRs |
|--------|----------|-----|
| **Auth** | `app/(auth)`, `lib/supabase` | FR1-FR7 |
| **Org** | `lib/supabase`, middleware | FR8-FR11 |
| **Contacts** | `app/contacts`, `server/routers/contacts.ts` | FR12-FR18 |
| **Projects** | `app/projects`, `server/routers/projects.ts` | FR19-FR24 |
| **Tasks** | `app/tasks`, `server/routers/tasks.ts` | FR25-FR30 |
| **AI Chat** | `app/chat`, `lib/ai`, `server/routers/chat.ts` | FR31-FR39 |
| **RAG** | `lib/ai/context.ts`, `server/services/rag-service.ts` | FR40-FR44 |
| **Directives** | `app/settings/directives`, `server/routers/directives.ts` | FR45-FR48 |
| **Documents** | `app/documents`, `server/services` | FR49-FR51 |
| **Integrations** | `server/services`, `api/webhooks` | FR52-FR54 |
| **Billing** | `app/settings/billing`, `lib/stripe` | FR55-FR58 |

---

## Architecture Validation Results

### Coherence Validation ✅

| Check | Status |
|-------|--------|
| Decision Compatibility | ✅ All tech choices work together |
| Pattern Consistency | ✅ Naming/structure aligned |
| Structure Alignment | ✅ Project structure supports decisions |

### Requirements Coverage ✅

**58/58 FRs architecturally supported**

| Category | FRs | Status |
|----------|-----|--------|
| Auth & Users | FR1-FR7 | ✅ |
| Organization | FR8-FR11 | ✅ |
| Contacts | FR12-FR18 | ✅ |
| Projects | FR19-FR24 | ✅ |
| Tasks | FR25-FR30 | ✅ |
| AI Chat | FR31-FR39 | ✅ |
| RAG | FR40-FR44 | ✅ |
| Directives | FR45-FR48 | ✅ |
| Documents | FR49-FR51 | ✅ |
| Integrations | FR52-FR54 | ✅ |
| Billing | FR55-FR58 | ✅ |

### Implementation Readiness ✅

- ✅ Decisions documented with versions
- ✅ Patterns comprehensive
- ✅ Structure complete
- ✅ Consistency rules clear

### Architecture Readiness Assessment

**Overall Status:** 🟢 READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

### Implementation Handoff

**First Step:**
```bash
npx create-next-app@latest orbitcrm --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions

---

<!-- Architecture document complete -->






