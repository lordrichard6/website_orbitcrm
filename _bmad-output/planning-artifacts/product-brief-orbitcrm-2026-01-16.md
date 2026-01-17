---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - "../../../specs.md"
date: 2026-01-16
author: Paulolopes
---

# Product Brief: OrbitCRM

## Executive Summary

**OrbitCRM** is an AI-native business command center that unifies client management, project tracking, and task execution into a single, intelligent platform. Unlike traditional CRMs that treat AI as an add-on, OrbitCRM makes AI the primary interface—an always-present "super employee" that can generate proposals, send emails, execute workflows, and automate repetitive tasks.

Built for SMBs who are tired of juggling multiple tools, but architected to scale for enterprises. OrbitCRM eliminates context-switching by providing a unified workspace with built-in productivity tools (PDF editor, file converters, email integration) and a directive-based AI that follows organizational SOPs just like a trained team member.

**Core Value:** Make every user 100x more productive by replacing 10+ manual steps with one-click AI-powered actions.

---

## Core Vision

### Problem Statement

Modern businesses are drowning in tool fragmentation. The average SMB uses 5-10 separate applications to manage clients, projects, tasks, documents, and communication. Each context-switch costs 23 minutes of focus. Existing "AI-powered" tools add chatbots as afterthoughts, not as core architecture.

### Problem Impact

- Leads fall through cracks between tools
- Project updates scatter across email, Slack, and spreadsheets
- Teams spend more time managing tools than serving clients
- AI assistants lack the context to be truly helpful

### Why Existing Solutions Fall Short

- **Traditional CRMs** (HubSpot, Salesforce): Powerful but bloated, expensive, steep learning curves
- **Modern CRMs** (Folk, Attio): Simpler but limited in scope, no true AI execution
- **Project Tools** (Monday, Asana): Great for tasks, terrible for client relationships
- **AI Tools** (ChatGPT, Claude): Brilliant but lack business context and can't execute actions

### Proposed Solution

An AI-native platform where the chat interface is the command center. Users delegate tasks naturally—"Draft a proposal for Client X based on our services pricing" or "Send a follow-up email to all leads who haven't responded in 7 days"—and the AI executes with full context awareness.

Key capabilities:
- **Contacts & Pipeline**: Lead to client lifecycle with AI-powered scoring and nurturing
- **Projects & Tasks**: Client-linked or standalone with automated progress tracking
- **AI Chat**: Multi-model (GPT-4, Claude, Gemini) with organizational knowledge (RAG)
- **Built-in Tools**: PDF generator, file converters, email/calendar integration
- **Directive System**: AI follows organizational SOPs for consistent execution

### Key Differentiators

1. **AI as Primary Interface**: Not a sidebar—the main way users work
2. **Unified Data Model**: Contacts, projects, tasks share context
3. **Directive-Based AI**: Follows SOPs like a trained employee
4. **Built-in Tool Suite**: Reduces external dependencies
5. **Module Architecture**: Extensible for custom workflows (future)

---

## Target Users

### Primary Users

**1. Solo Consultant / Freelancer — "Paulo"**
- **Role:** Independent consultant running a web development/automation agency
- **Context:** Works alone or with 1-2 contractors, manages 5-15 active clients
- **Current Tools:** Notion + spreadsheets + email + ChatGPT separately
- **Pain Points:**
  - Context-switching between 5+ apps daily
  - Manual follow-ups that get forgotten
  - No unified view of client history + projects + tasks
  - AI tools lack business context
- **Success Vision:** "I tell the AI to draft a proposal for Client X, and it knows my pricing, the client's history, and generates it in seconds."
- **Technical Level:** Tech-savvy, comfortable with AI, wants to automate everything

**2. SMB Operations Manager — "Sofia"**
- **Role:** Manages a team of 5-10 at a growing service business
- **Context:** Oversees sales, projects, and client fulfillment
- **Current Tools:** HubSpot (expensive), Monday (tasks), email (chaos)
- **Pain Points:**
  - Team scattered across tools, no single source of truth
  - Paying for 3+ subscriptions that don't talk to each other
  - Junior team members need hand-holding on every task
- **Success Vision:** "The AI handles repetitive tasks so my team can focus on high-value work. One tool, one dashboard, one brain."
- **Technical Level:** Moderate, needs clean UI, not a power-user

**3. Sales Rep at SMB — "Lucas"**
- **Role:** BDR/SDR at a 20-50 person company
- **Context:** Manages 100+ leads, needs fast follow-ups
- **Current Tools:** Salesforce (overkill), Outreach (expensive)
- **Pain Points:**
  - Too much manual data entry
  - Forgetting to follow up with warm leads
  - CRM feels like a chore, not a helper
- **Success Vision:** "I tell the AI to draft follow-ups for everyone who hasn't replied in 5 days, and it just handles it."
- **Technical Level:** Low to moderate, needs simplicity

### Secondary Users

**1. Team Members — "Junior Employees"**
- Assigned tasks by managers, execute work
- Need clear instructions, not overhead
- Benefit from AI-generated task breakdowns

**2. Admins — "IT/Operations"**
- Configure organization settings, manage user roles
- Set up integrations (email, Drive, calendar)
- Define company-wide directives/SOPs for AI to follow

**3. Clients (Future) — "Maria"**
- Receives proposals, invoices, project updates
- Portal access (later) for approvals and communication

### User Journey

| Stage | Experience |
|-------|------------|
| **Discovery** | "I saw a LinkedIn post about an AI-native CRM and signed up for the free trial" |
| **Onboarding** | "I imported my contacts from CSV, connected my email, and the AI summarized what it learned" |
| **First Value** | "I asked it to draft a follow-up email for a cold lead—it pulled context from our past conversation and nailed it" |
| **Aha Moment** | "I said 'create a proposal for Client X' and it generated a PDF using my pricing and their project history" |
| **Retention** | "I start every day by opening the chat and asking 'What should I focus on today?'" |

---

## Success Metrics

**North Star Metric:** Weekly Active Users (WAU) — Target: 40+

This captures both acquisition and engagement. A user who returns weekly is getting real value.

### User Success Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Time to First Value** | Time from signup to first AI-generated output | < 10 minutes |
| **AI Actions per User** | AI chat interactions per week per active user | 15+ actions/week |
| **Task Completion Rate** | % of AI-generated tasks/proposals accepted | > 70% |
| **Retention (D7)** | Users returning within 7 days of signup | > 40% |
| **NPS Score** | Net Promoter Score from user surveys | > 40 |

### Business Objectives

| Timeframe | Objective | Target |
|-----------|-----------|--------|
| **Month 3** | MVP live, self-use validated | 1 paying customer (you) |
| **Month 6** | Early adopters onboarded | $3K MRR, 40 WAU |
| **Month 12** | Product-market fit signals | $10K MRR, 100 WAU |
| **Month 18** | Scale mode | $30K MRR, 300 WAU |

### Key Performance Indicators

| Category | KPI | Measurement |
|----------|-----|-------------|
| **Growth** | Monthly signups | New users per month |
| **Engagement** | WAU / MAU ratio | Stickiness indicator (target: 50%+) |
| **Revenue** | MRR | Monthly Recurring Revenue |
| **Revenue** | ARPU | Average Revenue Per User (~$75/user) |
| **Churn** | Monthly churn rate | % of paying users lost (target: < 5%) |
| **Efficiency** | AI resolution rate | % of requests AI handles without manual intervention |

### Leading Indicators

1. **Activation Rate** — % of signups who complete onboarding and execute first AI action
2. **Feature Adoption** — % of users using Contacts + Projects + Tasks (full stack)
3. **AI Chat Frequency** — Users who chat daily vs. weekly
4. **Referral Rate** — Users who invite team members

---

## MVP Scope

### Core Features (v1.0)

**1. Authentication & Authorization**
- Supabase Auth (Email + Google OAuth)
- Role-based access: Owner, Admin, Member, Viewer
- Multi-tenancy with organization isolation
- Invite team members via email

**2. Contacts Module**
- Create, edit, delete contacts
- Classification: Lead → Opportunity → Client → Churned
- Custom tags and notes
- Activity timeline per contact
- CSV import/export
- Search and filters

**3. Projects Module**
- Create projects (linked to client or personal)
- Project status and milestones
- Team member assignments
- File attachments
- Deadline tracking

**4. Tasks Module**
- Tasks linked to: Contact, Project, or Standalone
- Priority levels (Low, Medium, High, Urgent)
- Due dates and reminders
- Kanban and List views
- Subtasks/checklists

**5. AI Chat Module** ⭐ CORE
- Multi-model selection (GPT-4, Claude, Gemini)
- Model quotas per user/plan
- Streaming responses
- Conversation history
- Context from current contact/project
- Code syntax highlighting

**6. RAG Knowledge Base** ⭐ DEALBREAKER
- Upload documents (PDF, TXT, MD)
- Automatic chunking and embedding (pgvector)
- Query knowledge base in AI chat
- Source citations in responses
- Out-of-the-box functionality

**7. Documents Module**
- PDF proposal generator
- Basic template system
- Send via email (manual for MVP)

### Out of Scope for MVP

| Feature | Rationale |
|---------|-----------|
| Finance Module | Deferred to v2.0 per user decision |
| Email/Calendar Integration | OAuth complexity, not core |
| Retell Call Dashboard | Future integration |
| Module Creator | Requires stable core first |
| Automations Builder | Post-MVP once patterns emerge |
| White-labeling | Enterprise tier feature |
| Mobile App | Web-first approach |
| E-signatures | Nice-to-have for proposals |

### MVP Success Criteria

| Gate | Criteria | Target |
|------|----------|--------|
| **Technical** | App deploys, core features work | 100% |
| **Self-Use** | You use it daily for Lopes2Tech | 2+ weeks |
| **AI Value** | RAG answers questions accurately | 80%+ satisfaction |
| **First User** | One external user completes workflow | 1 user |
| **Feedback** | Positive signal from 3 beta users | 3+ NPS > 7 |

**Go/No-Go Decision:** If MVP hits these gates, proceed to public launch.

### Future Vision

**Phase 2: Automation & Finance**
- Finance module (invoices, expenses, P&L)
- Email integration (Gmail/Outlook sync)
- Visual workflow/automation builder
- Payment gateway (Stripe)

**Phase 3: Integrations & Scale**
- Calendar sync (Google/Outlook)
- Retell call dashboard
- Zapier/n8n webhooks
- API access for developers

**Phase 4: Platform**
- Module creator for custom workflows
- Marketplace for community modules
- White-label for agencies
- Mobile companion app

---

<!-- Product Brief Complete -->


