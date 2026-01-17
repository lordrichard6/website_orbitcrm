---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - "product-brief-orbitcrm-2026-01-16.md"
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: "SaaS Web Application"
  domain: "AI-Powered Business Productivity"
  complexity: "Very High"
  projectContext: "greenfield"
  pricingModel:
    tiers:
      - name: "Free"
        price: 0
        models: ["GPT-4o Mini"]
        tokenLimit: 1000
      - name: "Basic"
        price: 19
        models: ["GPT-4o"]
        tokenLimit: 50000
      - name: "Pro"
        price: 49
        models: ["GPT-4", "Claude", "Gemini Pro"]
        tokenLimit: 200000
    tokenPacks: true
    monthlyReset: true
---

# Product Requirements Document - OrbitCRM

**Author:** Paulolopes
**Date:** 2026-01-16

---

## Success Criteria

### User Success

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Value | < 10 min | Signup → first AI output |
| AI Task Completion | > 70% | AI suggestions accepted |
| Weekly Engagement | 15+ actions | AI chat interactions/week |
| Retention (D7) | > 40% | Return within 7 days |
| NPS Score | > 40 | User satisfaction |

**Aha Moment:** User says "create a proposal for Client X" and AI generates a PDF using their pricing and client history.

### Business Success

| Timeframe | Milestone | Target |
|-----------|-----------|--------|
| Month 3 | MVP Live | Self-use validated |
| Month 6 | Early Adopters | $3K MRR, 40 WAU |
| Month 12 | PMF Signals | $10K MRR, 100 WAU |
| Month 18 | Scale Mode | $30K MRR, 300 WAU |

### Technical Success

| Metric | Target | Rationale |
|--------|--------|-----------|
| Uptime | 99.5% | Trust for business users |
| AI Response Time | < 3s streaming start | Real-time feel |
| RAG Accuracy | > 80% | Knowledge base reliability |
| Token Tracking | 100% accurate | Billing integrity |

### Measurable Outcomes

- **North Star Metric:** 40 Weekly Active Users
- **Primary Revenue Goal:** $3K MRR by Month 6
- **Dealbreaker Feature:** AI RAG must work out-of-the-box

---

## Product Scope

### MVP - Minimum Viable Product

1. **Authentication & RBAC** - Supabase Auth, roles (Owner/Admin/Member/Viewer), multi-tenancy
2. **Contacts Module** - Lead pipeline, tags, notes, CSV import
3. **Projects Module** - Client-linked or personal, milestones
4. **Tasks Module** - Linked entities, priorities, Kanban view
5. **AI Chat** - Multi-model selection, streaming, context-aware
6. **RAG Knowledge Base** - Document upload, pgvector, citations
7. **Documents** - PDF proposal generator
8. **Pricing & Billing** - Free/Basic/Pro tiers, Stripe integration

### Growth Features (Post-MVP)

- Finance module (invoices, expenses)
- Email/Calendar integration
- Automations builder
- Advanced analytics dashboard

### Vision (Future)

- Module creator for custom workflows
- Marketplace for community modules
- Mobile companion app
- White-label for agencies
- Retell call dashboard integration

---

## User Journeys

### Journey 1: Paulo (Solo Consultant) - First Value

**Opening Scene:** Paulo runs Lopes2Tech, juggling 12 clients across Notion, spreadsheets, and email. It's 10 PM. He realizes he forgot to follow up with a warm lead from 5 days ago. Lost opportunity.

**Rising Action:** He discovers OrbitCRM through a LinkedIn post. Signs up, imports his contacts via CSV. The AI immediately summarizes: "You have 3 leads with no activity in 7+ days."

**Climax:** He types: "Draft a follow-up email for João at TechStart." The AI pulls João's context from notes and generates a personalized email in seconds. Paulo tweaks one line and sends it.

**Resolution:** João responds the next morning. Paulo lands the project. He now starts every day asking the AI: "What should I focus on today?"

### Journey 2: Sofia (SMB Manager) - Team Onboarding

**Opening Scene:** Sofia manages a 7-person service team. They're paying $500/month for HubSpot + Monday + Slack. Half her day is spent asking "Where's the status on Project X?"

**Rising Action:** She migrates to OrbitCRM. Invites her team. Each member gets role-based access. The AI learns their company's services and proposal templates.

**Climax:** A junior team member asks the AI: "How do we usually price a website redesign?" The AI responds with their standard pricing from the uploaded company docs.

**Resolution:** Team productivity jumps. Sofia no longer answers repetitive questions. Monthly tool cost drops to $200.

### Journey 3: Lucas (Sales Rep) - Pipeline Automation

**Opening Scene:** Lucas manages 150 leads in Salesforce. He spends 2 hours daily on data entry and manual follow-ups. His close rate is suffering.

**Rising Action:** His company switches to OrbitCRM. He tells the AI: "Show me all leads that haven't responded in 5+ days." It lists 23 leads instantly.

**Climax:** He says: "Draft personalized follow-ups for all of them using their last conversation context." The AI generates 23 drafts in 30 seconds. He reviews, tweaks 3, and bulk-sends.

**Resolution:** His response rate doubles. He reclaims 90 minutes daily. His manager asks: "How are you closing so many more deals?"

### Journey 4: Maria (Admin) - System Setup

**Opening Scene:** Maria is tasked with setting up OrbitCRM for her 20-person company. She needs to configure roles, integrations, and company-wide AI behavior.

**Rising Action:** She logs in as Admin. Creates organization structure: Sales, Delivery, Support teams. Sets up RBAC: Sales can only see their leads, Delivery sees projects, Support sees all.

**Climax:** She uploads the company's service catalog, pricing sheets, and proposal templates. Defines a "directive" that the AI should always recommend upselling when a client mentions growth.

**Resolution:** The system is live. New team members get onboarded by the AI. Every proposal follows company standards.

### Journey Requirements Summary

| Journey | Capabilities Required |
|---------|----------------------|
| **Paulo (Solo)** | Import, AI chat, context awareness, email drafting, daily focus |
| **Sofia (Team)** | Team invite, RBAC, RAG for company docs, unified dashboard |
| **Lucas (Sales)** | Bulk lead actions, AI-generated follow-ups, pipeline views |
| **Maria (Admin)** | Org setup, role management, directive definitions, template upload |

---

## Domain-Specific Requirements

### Compliance & Regulatory

| Area | Requirement | MVP Priority |
|------|-------------|--------------|
| **GDPR** | Data export/deletion, consent tracking | ✅ Required |
| **Data Privacy** | User data isolation (multi-tenancy RLS) | ✅ Required |
| **AI Transparency** | Users know AI is responding, model disclosure | ✅ Good practice |
| **SOC2** | Security controls, audit logs | ⏳ Post-MVP |

### Technical Constraints

| Area | Requirement | Implementation |
|------|-------------|----------------|
| **Security** | HTTPS, encrypted secrets, RLS | Supabase defaults |
| **Auth** | MFA optional, session management | Supabase Auth |
| **API Limits** | Rate limiting on AI endpoints | tRPC middleware |
| **Token Billing** | Accurate per-model tracking | Custom metering |

### Integration Requirements

| System | Purpose | MVP Priority |
|--------|---------|--------------|
| **Stripe** | Subscriptions + metered billing | ✅ Required |
| **OpenAI/Anthropic/Google** | Multi-model AI | ✅ Required |
| **Supabase Storage** | File uploads for RAG | ✅ Required |
| **Email (Resend/SendGrid)** | Transactional emails | ✅ Required |
| **Google OAuth** | Social login | ✅ Required |

### Risk Mitigations

| Risk | Mitigation |
|------|------------|
| **AI hallucinations** | RAG citations, source display |
| **Token overspend** | Hard limits, usage alerts |
| **Data leakage** | Row-Level Security, org isolation |
| **Vendor lock-in** | Abstract LLM providers, standard APIs |

---

## Innovation & Novel Patterns

### Detected Innovation Areas

| Innovation | Description | Competitive Moat |
|------------|-------------|------------------|
| **AI as Primary Interface** | Chat is THE interface, not a sidebar | Paradigm inversion |
| **Directive System with Learning** | AI follows SOPs + learns from corrections | Organizational memory |
| **Full Execution Engine** | AI sends emails, creates events, triggers webhooks | Beyond advisory AI |
| **Flexible Context Scope** | User controls context depth (general ↔ specific) | Precision AND efficiency |
| **Context Attachment UI** | "+" button to add directives, files, clients | Like IDE experience |
| **Multi-Chat Architecture** | Multiple parallel conversations | Power-user workflow |
| **Model Selection** | User chooses model per task (quality vs. cost) | Transparency + control |

### Core Innovation: The Context Engine

**User-Controlled Context:**
```
[+ Add Context]
├── 📋 Directives (company SOPs)
├── 📁 Files (proposals, docs)
├── 👤 Clients (specific contact)
├── 📂 Projects (scope to project)
└── 💬 Previous chats (conversation history)

No context selected → General assistant mode
Context selected → Scoped, efficient, relevant
```

### AI Execution Capabilities

| Action | MVP | Description |
|--------|-----|-------------|
| ✅ Draft emails | Yes | In-app composition |
| ✅ Send emails | Yes | Requires user confirmation |
| ✅ Generate PDFs | Yes | Proposals, invoices |
| ✅ Update CRM fields | Yes | Lead status, notes |
| ✅ Create tasks | Yes | Auto-assign from chat |
| ✅ Trigger webhooks | Yes | n8n, Zapier, custom |
| ⏳ Calendar events | Post-MVP | Google/Outlook sync |

### Multi-Model Strategy

| Model | Use Case | Token Cost |
|-------|----------|------------|
| **GPT-4o Mini** | Fast, cheap tasks | $ |
| **GPT-4o** | Balanced quality | $$ |
| **GPT-4 Turbo** | Complex reasoning | $$$ |
| **Claude 3.5 Sonnet** | Best for writing | $$ |
| **Claude 3 Opus** | Premium quality | $$$$ |
| **Gemini Pro** | Google ecosystem | $$ |

User selects model per conversation or per organization default.

### Validation Approach

| Aspect | Validation Method |
|--------|-------------------|
| **AI-First UX** | Can users complete core tasks via chat only? |
| **Directive System** | Does AI follow company SOPs accurately? |
| **Execution Quality** | Are AI-generated proposals usable without editing? |
| **Context Scoping** | Does scoped context improve response quality? |

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| AI doesn't understand context | Start with structured commands, evolve to natural language |
| Users prefer clicking over chatting | Offer both: chat AND traditional forms/views |
| Directive system too complex | Start with templates, let power users customize |
| Context overload | Smart context summarization, relevance ranking |

---

## SaaS-Specific Requirements

### Multi-Tenancy Model

- **Architecture:** Shared database with Row-Level Security (RLS) via Supabase
- **Isolation:** Organization-level data isolation at database layer
- **Scoping:** Each org has its own: users, contacts, projects, tasks, AI conversations, directives

### RBAC Matrix

| Role | Contacts | Projects | Tasks | AI Chat | Settings | Billing |
|------|----------|----------|-------|---------|----------|---------|
| **Owner** | Full | Full | Full | Full | Full | Full |
| **Admin** | Full | Full | Full | Full | Full | View |
| **Member** | Full | Assigned | Assigned | Full | - | - |
| **Viewer** | View | View | View | View | - | - |

### Authentication

| Method | MVP | Notes |
|--------|-----|-------|
| Email + Password | ✅ | Supabase Auth |
| Google OAuth | ✅ | Primary social login |
| GitHub OAuth | ⏳ | Post-MVP |
| MFA (TOTP) | ✅ | Optional per user |

### API Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 App Router | React framework |
| **API** | tRPC | Type-safe endpoints |
| **Database** | Supabase (PostgreSQL) | Data persistence |
| **Auth** | Supabase Auth | Session management |
| **Realtime** | Supabase Realtime | Live updates |
| **AI Streaming** | Vercel AI SDK | Streaming responses |

### File Storage

| Storage | Purpose |
|---------|---------|
| Supabase Storage | User uploads (PDFs, docs) |
| pgvector | RAG embeddings |
| Vercel CDN | Static assets |

### Key Integrations

| Integration | Priority | Purpose |
|-------------|----------|---------|
| **Stripe** | MVP | Billing, subscriptions, metered usage |
| **OpenAI** | MVP | GPT-4o, GPT-4 Turbo |
| **Anthropic** | MVP | Claude 3.5 Sonnet, Claude 3 Opus |
| **Google AI** | MVP | Gemini Pro |
| **Resend** | MVP | Transactional emails |
| **Webhooks** | MVP | n8n, Zapier, custom integrations |

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP

Deliver the core "super employee" experience that solves the fragmentation problem. Users should be able to manage contacts, projects, tasks via AI chat with RAG from Day 1.

**Resource Requirements:** Solo developer with AI/Full-stack expertise

### MVP Feature Set (Phase 1: Months 1-3)

**Core User Journeys Supported:**
- Paulo (Solo): First value via AI follow-up drafting
- Sofia (Team): Basic team onboarding and RAG
- Maria (Admin): Organization setup and RBAC

**Must-Have Capabilities:**

| Module | MVP Scope |
|--------|-----------|
| **Auth** | Email + Google OAuth, RBAC, Multi-tenancy |
| **Contacts** | CRUD, pipeline, tags, notes, CSV import |
| **Projects** | CRUD, status, deadlines, team assignment |
| **Tasks** | CRUD, priorities, linked entities, Kanban |
| **AI Chat** | Multi-model, streaming, context scoping |
| **RAG** | Document upload, embeddings, citations |
| **Documents** | Basic PDF proposals |
| **Billing** | Stripe, 3 tiers, token tracking |

### Post-MVP Features

**Phase 2: Growth (Months 4-6)**
- Email integration (Gmail/Outlook)
- Advanced analytics dashboard
- Directive learning system
- Multi-chat architecture
- Bulk actions for pipeline management

**Phase 3: Platform (Months 7-12)**
- Finance module (invoices, payments)
- Calendar sync
- Automations builder
- Webhook marketplace
- Custom directive creator

**Phase 4: Scale (Year 2+)**
- Module creator for custom workflows
- Mobile companion app
- White-label for agencies
- Retell call dashboard integration

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Technical** | AI quality inconsistent | Start with structured prompts, iterate on examples |
| **Market** | Users prefer traditional UI | Offer hybrid: chat + forms/views |
| **Resource** | Solo developer bandwidth | Focus on core features, defer polish |

---

## Functional Requirements

### 1. Authentication & User Management

- **FR1:** Users can sign up with email and password
- **FR2:** Users can sign in with Google OAuth
- **FR3:** Users can enable two-factor authentication (TOTP)
- **FR4:** Owners can invite team members via email
- **FR5:** Owners can assign roles (Admin, Member, Viewer) to team members
- **FR6:** Users can view and update their profile
- **FR7:** Users can reset their password via email

### 2. Organization & Multi-Tenancy

- **FR8:** Owners can create and name their organization
- **FR9:** Users can only access data within their organization
- **FR10:** Admins can manage organization settings
- **FR11:** Owners can view and manage billing information

### 3. Contact Management

- **FR12:** Users can create, view, edit, and delete contacts
- **FR13:** Users can classify contacts (Lead → Opportunity → Client → Churned)
- **FR14:** Users can add tags and notes to contacts
- **FR15:** Users can import contacts from CSV
- **FR16:** Users can export contacts to CSV
- **FR17:** Users can search and filter contacts
- **FR18:** Users can view contact activity timeline

### 4. Project Management

- **FR19:** Users can create, view, edit, and delete projects
- **FR20:** Users can link projects to clients
- **FR21:** Users can set project status and milestones
- **FR22:** Users can assign team members to projects
- **FR23:** Users can attach files to projects
- **FR24:** Users can view project deadlines

### 5. Task Management

- **FR25:** Users can create, view, edit, and delete tasks
- **FR26:** Users can link tasks to contacts, projects, or standalone
- **FR27:** Users can set task priority (Low, Medium, High, Urgent)
- **FR28:** Users can set due dates on tasks
- **FR29:** Users can view tasks in Kanban or List view
- **FR30:** Users can create subtasks and checklists

### 6. AI Chat & Conversation

- **FR31:** Users can open AI chat conversations
- **FR32:** Users can select AI model per conversation
- **FR33:** Users can attach context to conversations (contacts, projects, files, directives)
- **FR34:** Users can view streaming AI responses in real-time
- **FR35:** Users can view conversation history
- **FR36:** Users can open multiple parallel chat conversations
- **FR37:** AI can draft emails based on context
- **FR38:** AI can generate task suggestions from conversation
- **FR39:** AI can update CRM fields based on user confirmation

### 7. RAG & Knowledge Base

- **FR40:** Users can upload documents (PDF, TXT, MD)
- **FR41:** System can chunk and embed documents automatically
- **FR42:** Users can query knowledge base through AI chat
- **FR43:** AI responses include source citations when using RAG
- **FR44:** Users can manage uploaded documents

### 8. Directives & AI Behavior

- **FR45:** Admins can create organizational directives (SOPs)
- **FR46:** Users can attach directives to AI conversations
- **FR47:** AI follows attached directives when responding
- **FR48:** Admins can edit and delete directives

### 9. Document Generation

- **FR49:** Users can generate PDF proposals from templates
- **FR50:** Users can preview generated documents
- **FR51:** Users can download generated documents

### 10. Integrations & Actions

- **FR52:** AI can send emails with user confirmation
- **FR53:** AI can trigger webhook actions
- **FR54:** System can track token usage per user and model

### 11. Billing & Subscriptions

- **FR55:** Users can view their current plan and usage
- **FR56:** Users can upgrade or downgrade their plan
- **FR57:** Users can purchase token packs
- **FR58:** System enforces token limits per plan

---

## Non-Functional Requirements

### Performance

| ID | Requirement | Target |
|----|-------------|--------|
| **NFR1** | Page load time | < 3 seconds |
| **NFR2** | AI streaming start | < 2 seconds |
| **NFR3** | RAG query response | < 5 seconds |
| **NFR4** | Concurrent users supported | 100 simultaneous |

### Security

| ID | Requirement | Target |
|----|-------------|--------|
| **NFR5** | Data encryption at rest | AES-256 (Supabase default) |
| **NFR6** | Data encryption in transit | TLS 1.3 |
| **NFR7** | Session timeout | 24 hours |
| **NFR8** | API key encryption | Encrypted in database |
| **NFR9** | RLS enforcement | All user data isolated by org |

### Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| **NFR10** | User growth support | 10x with < 10% degradation |
| **NFR11** | Database connections | Auto-scaling (Supabase managed) |
| **NFR12** | File storage per org | 10GB |

### Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| **NFR13** | System uptime | 99.5% |
| **NFR14** | Data backup frequency | Daily (Supabase managed) |
| **NFR15** | AI provider failover | Graceful degradation with error message |

### Integration

| ID | Requirement | Target |
|----|-------------|--------|
| **NFR16** | Webhook delivery success | 99% |
| **NFR17** | AI provider timeout | 60 seconds max |
| **NFR18** | Stripe sync | Real-time |

---

<!-- PRD Complete -->








