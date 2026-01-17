---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - "prd.md"
  - "architecture.md"
---

# OrbitCRM - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for OrbitCRM, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Authentication & User Management (7 FRs)**
- FR1: Users can sign up with email and password
- FR2: Users can sign in with Google OAuth
- FR3: Users can enable two-factor authentication (TOTP)
- FR4: Owners can invite team members via email
- FR5: Owners can assign roles (Admin, Member, Viewer) to team members
- FR6: Users can view and update their profile
- FR7: Users can reset their password via email

**Organization & Multi-Tenancy (4 FRs)**
- FR8: Owners can create and name their organization
- FR9: Users can only access data within their organization
- FR10: Admins can manage organization settings
- FR11: Owners can view and manage billing information

**Contact Management (7 FRs)**
- FR12: Users can create, view, edit, and delete contacts
- FR13: Users can classify contacts (Lead → Opportunity → Client → Churned)
- FR14: Users can add tags and notes to contacts
- FR15: Users can import contacts from CSV
- FR16: Users can export contacts to CSV
- FR17: Users can search and filter contacts
- FR18: Users can view contact activity timeline

**Project Management (6 FRs)**
- FR19: Users can create, view, edit, and delete projects
- FR20: Users can link projects to clients
- FR21: Users can set project status and milestones
- FR22: Users can assign team members to projects
- FR23: Users can attach files to projects
- FR24: Users can view project deadlines

**Task Management (6 FRs)**
- FR25: Users can create, view, edit, and delete tasks
- FR26: Users can link tasks to contacts, projects, or standalone
- FR27: Users can set task priority (Low, Medium, High, Urgent)
- FR28: Users can set due dates on tasks
- FR29: Users can view tasks in Kanban or List view
- FR30: Users can create subtasks and checklists

**AI Chat & Conversation (9 FRs)**
- FR31: Users can open AI chat conversations
- FR32: Users can select AI model per conversation
- FR33: Users can attach context to conversations (contacts, projects, files, directives)
- FR34: Users can view streaming AI responses in real-time
- FR35: Users can view conversation history
- FR36: Users can open multiple parallel chat conversations
- FR37: AI can draft emails based on context
- FR38: AI can generate task suggestions from conversation
- FR39: AI can update CRM fields based on user confirmation

**RAG & Knowledge Base (5 FRs)**
- FR40: Users can upload documents (PDF, TXT, MD)
- FR41: System can chunk and embed documents automatically
- FR42: Users can query knowledge base through AI chat
- FR43: AI responses include source citations when using RAG
- FR44: Users can manage uploaded documents

**Directives & AI Behavior (4 FRs)**
- FR45: Admins can create organizational directives (SOPs)
- FR46: Users can attach directives to AI conversations
- FR47: AI follows attached directives when responding
- FR48: Admins can edit and delete directives

**Document Generation (3 FRs)**
- FR49: Users can generate PDF proposals from templates
- FR50: Users can preview generated documents
- FR51: Users can download generated documents

**Integrations & Actions (3 FRs)**
- FR52: AI can send emails with user confirmation
- FR53: AI can trigger webhook actions
- FR54: System can track token usage per user and model

**Billing & Subscriptions (4 FRs)**
- FR55: Users can view their current plan and usage
- FR56: Users can upgrade or downgrade their plan
- FR57: Users can purchase token packs
- FR58: System enforces token limits per plan

### Non-Functional Requirements

**Performance (4 NFRs)**
- NFR1: Page load time < 3 seconds
- NFR2: AI streaming start < 2 seconds
- NFR3: RAG query response < 5 seconds
- NFR4: 100 concurrent users supported

**Security (5 NFRs)**
- NFR5: Data encryption at rest (AES-256)
- NFR6: Data encryption in transit (TLS 1.3)
- NFR7: Session timeout 24 hours
- NFR8: API key encryption in database
- NFR9: RLS enforcement on all user data

**Scalability (3 NFRs)**
- NFR10: 10x growth with < 10% degradation
- NFR11: Auto-scaling database connections
- NFR12: 10GB file storage per org

**Reliability (3 NFRs)**
- NFR13: 99.5% system uptime
- NFR14: Daily data backups
- NFR15: Graceful AI provider failover

**Integration (3 NFRs)**
- NFR16: 99% webhook delivery success
- NFR17: 60 second AI provider timeout
- NFR18: Real-time Stripe sync

### Additional Requirements (From Architecture)

**Starter Template:**
- Use `npx create-next-app@latest orbitcrm --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Add Supabase, tRPC, shadcn/ui, Vercel AI SDK incrementally

**Technical Requirements:**
- Next.js 15 App Router with TypeScript
- Supabase PostgreSQL + pgvector for database
- tRPC for type-safe API
- Supabase Auth with Google OAuth
- Tailwind CSS + shadcn/ui for styling
- React Query + Zustand for state
- Vercel AI SDK for streaming
- Stripe for billing
- Resend for email
- Vercel for deployment

**Implementation Patterns:**
- snake_case for database, camelCase for TypeScript
- tRPC for all internal APIs
- React Query for server state
- Zustand for client-only state
- Zod for all validation

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1-FR7 | Epic 2 | Authentication & User Management |
| FR8-FR11 | Epic 2 | Organization & Multi-Tenancy |
| FR12-FR18 | Epic 3 | Contact Management |
| FR19-FR24 | Epic 4 | Project Management |
| FR25-FR30 | Epic 4 | Task Management |
| FR31-FR36 | Epic 5 | AI Chat Core |
| FR37-FR39 | Epic 8 | AI Actions & Execution |
| FR40-FR44 | Epic 6 | RAG & Knowledge Base |
| FR45-FR48 | Epic 7 | Directives & Context |
| FR49-FR51 | Epic 9 | Document Generation |
| FR52-FR53 | Epic 8 | Integrations |
| FR54-FR58 | Epic 10 | Billing & Subscriptions |

---

## Epic List

### Epic 1: Project Foundation
Initialize core application infrastructure with Next.js, Supabase, and essential tooling.
**FRs covered:** Architecture setup (no FRs, enables all others)

### Epic 2: Authentication & Organization
Users can sign up, login, manage profiles, create organizations, and invite team members with roles.
**FRs covered:** FR1-FR11 (11 FRs)

### Epic 3: Contact Management
Users can manage contacts, classify them through the sales pipeline, tag, search, and track activity.
**FRs covered:** FR12-FR18 (7 FRs)

### Epic 4: Project & Task Management
Users can manage projects linked to clients, create tasks with priorities and deadlines, and view in Kanban.
**FRs covered:** FR19-FR30 (12 FRs)

### Epic 5: AI Chat Core
Users can have AI conversations with model selection, streaming responses, and conversation history.
**FRs covered:** FR31-FR36 (6 FRs)

### Epic 6: RAG & Knowledge Base
Users can upload documents, which are automatically chunked and embedded for AI-powered queries.
**FRs covered:** FR40-FR44 (5 FRs)

### Epic 7: Directives & Context
Users can create directives to guide AI behavior and attach context to conversations.
**FRs covered:** FR33, FR45-FR48 (5 FRs)

### Epic 8: AI Actions & Execution
AI can draft emails, suggest tasks, update CRM fields, and trigger webhooks with user confirmation.
**FRs covered:** FR37-FR39, FR52-FR53 (5 FRs)

### Epic 9: Document Generation
Users can generate PDF proposals from templates, preview, and download.
**FRs covered:** FR49-FR51 (3 FRs)

### Epic 10: Billing & Subscriptions
Users can manage subscription plans, track token usage, and purchase additional tokens.
**FRs covered:** FR54-FR58 (5 FRs)

---

<!-- Stories will be added for each epic -->

## Epic 1: Project Foundation

Initialize core application infrastructure with Next.js, Supabase, and essential tooling.

### Story 1.1: Initialize Next.js Project

As a developer,
I want a properly configured Next.js 15 project with TypeScript,
So that I have a solid foundation for building the application.

**Acceptance Criteria:**

**Given** an empty project directory
**When** I run the initialization command
**Then** a Next.js 15 project is created with App Router, TypeScript, Tailwind CSS, and ESLint
**And** the project structure follows the architecture document

---

### Story 1.2: Setup Supabase Integration

As a developer,
I want Supabase client configured for both client and server,
So that I can interact with the database and auth services.

**Acceptance Criteria:**

**Given** the Next.js project is initialized
**When** I install and configure Supabase packages
**Then** client-side and server-side Supabase clients are available
**And** environment variables are properly configured
**And** TypeScript types are generated from the database

---

### Story 1.3: Setup tRPC with React Query

As a developer,
I want tRPC configured for type-safe API calls,
So that I have end-to-end type safety between frontend and backend.

**Acceptance Criteria:**

**Given** the project has Supabase configured
**When** I implement tRPC with React Query
**Then** tRPC client and server are properly configured
**And** a sample router demonstrates the pattern
**And** React Query provider wraps the application

---

### Story 1.4: Install shadcn/ui Components

As a developer,
I want the shadcn/ui component library configured,
So that I can build consistent, accessible UI components.

**Acceptance Criteria:**

**Given** the project has Tailwind CSS configured
**When** I initialize shadcn/ui
**Then** base components (Button, Input, Card) are available
**And** the theme is configured with project colors
**And** dark mode support is enabled

---

### Story 1.5: Create Core Database Schema

As a developer,
I want the core database tables created with RLS policies,
So that the foundation tables exist for subsequent features.

**Acceptance Criteria:**

**Given** Supabase is configured
**When** I run database migrations
**Then** users, organizations, and org_members tables exist
**And** RLS policies enforce organization isolation
**And** foreign key relationships are properly defined

---

## Epic 2: Authentication & Organization

Users can sign up, login, manage profiles, create organizations, and invite team members.

### Story 2.1: Email/Password Registration

As a new user,
I want to sign up with my email and password,
So that I can create an account and access the application.

**Acceptance Criteria:**

**Given** I am on the signup page
**When** I enter valid email and password
**Then** my account is created in Supabase Auth
**And** I receive a confirmation email
**And** I am redirected to onboarding

---

### Story 2.2: Email/Password Login

As a registered user,
I want to log in with my email and password,
So that I can access my account.

**Acceptance Criteria:**

**Given** I have a verified account
**When** I enter correct credentials
**Then** I am authenticated and session is created
**And** I am redirected to the dashboard
**And** invalid credentials show appropriate error

---

### Story 2.3: Google OAuth Login

As a user,
I want to sign in with my Google account,
So that I can access the application without creating a new password.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I click "Sign in with Google"
**Then** I am redirected to Google OAuth
**And** upon success, my account is created/linked
**And** I am redirected to the dashboard

---

### Story 2.4: Password Reset Flow

As a user who forgot their password,
I want to reset my password via email,
So that I can regain access to my account.

**Acceptance Criteria:**

**Given** I click "Forgot Password"
**When** I enter my email
**Then** I receive a password reset email
**And** clicking the link allows me to set a new password
**And** I can login with the new password

---

### Story 2.5: Organization Creation

As a new user,
I want to create my organization during onboarding,
So that I have a workspace for my team.

**Acceptance Criteria:**

**Given** I am a newly registered user
**When** I complete the onboarding form with org name
**Then** an organization is created
**And** I am assigned as the Owner
**And** I am redirected to the dashboard

---

### Story 2.6: User Profile Management

As a user,
I want to view and update my profile,
So that my information is current.

**Acceptance Criteria:**

**Given** I am logged in
**When** I navigate to profile settings
**Then** I can view my current information
**And** I can update my name and avatar
**And** changes are saved to the database

---

### Story 2.7: Team Member Invitation

As an organization owner,
I want to invite team members via email,
So that they can join my organization.

**Acceptance Criteria:**

**Given** I am an Owner or Admin
**When** I invite a user by email
**Then** an invitation email is sent
**And** the invitee can join by clicking the link
**And** they are added with the specified role

---

### Story 2.8: Role-Based Access Control

As an organization owner,
I want to assign and manage roles for team members,
So that I can control access levels.

**Acceptance Criteria:**

**Given** I am an Owner
**When** I change a member's role
**Then** their permissions are updated immediately
**And** they can only access features based on their role
**And** role changes are logged

---

## Epic 3: Contact Management

Users can manage contacts, classify them through the sales pipeline, and track activity.

### Story 3.1: Contact CRUD Operations

As a CRM user,
I want to create, view, edit, and delete contacts,
So that I can manage my customer relationships.

**Acceptance Criteria:**

**Given** I am logged in
**When** I create a new contact with name and email
**Then** the contact is saved to my organization
**And** I can view contact details
**And** I can edit and delete contacts

---

### Story 3.2: Contact Pipeline Classification

As a sales user,
I want to classify contacts through pipeline stages,
So that I can track their journey.

**Acceptance Criteria:**

**Given** I have a contact
**When** I change their status (Lead → Opportunity → Client → Churned)
**Then** the status is updated
**And** the change is logged in activity timeline
**And** I can filter contacts by status

---

### Story 3.3: Contact Tags and Notes

As a CRM user,
I want to add tags and notes to contacts,
So that I can organize and document interactions.

**Acceptance Criteria:**

**Given** I am viewing a contact
**When** I add tags or notes
**Then** they are saved and displayed
**And** I can search contacts by tags
**And** notes show timestamp and author

---

### Story 3.4: Contact CSV Import

As a CRM user,
I want to import contacts from a CSV file,
So that I can migrate existing data.

**Acceptance Criteria:**

**Given** I have a CSV file with contacts
**When** I upload and map columns
**Then** contacts are imported to my organization
**And** duplicate handling is available
**And** import results are displayed

---

### Story 3.5: Contact CSV Export

As a CRM user,
I want to export contacts to CSV,
So that I can use data in other tools.

**Acceptance Criteria:**

**Given** I have contacts
**When** I click export
**Then** a CSV file is downloaded
**And** all contact fields are included
**And** I can filter which contacts to export

---

### Story 3.6: Contact Search and Filter

As a CRM user,
I want to search and filter contacts,
So that I can quickly find who I need.

**Acceptance Criteria:**

**Given** I have many contacts
**When** I use search or filters
**Then** results update in real-time
**And** I can filter by status, tags, and dates
**And** search works on name, email, and notes

---

### Story 3.7: Contact Activity Timeline

As a CRM user,
I want to view a contact's activity timeline,
So that I can see the history of interactions.

**Acceptance Criteria:**

**Given** I am viewing a contact
**When** I open the activity tab
**Then** I see chronological activity (status changes, notes, emails)
**And** activities show timestamp and actor
**And** I can filter by activity type

---

## Epic 4: Project & Task Management

Users can manage projects linked to clients and tasks with priorities.

### Story 4.1: Project CRUD Operations

As a user,
I want to create, view, edit, and delete projects,
So that I can organize my work.

**Acceptance Criteria:**

**Given** I am logged in
**When** I create a project with name and description
**Then** the project is saved to my organization
**And** I can view, edit, and delete it

---

### Story 4.2: Link Projects to Clients

As a user,
I want to link projects to client contacts,
So that I can track project-client relationships.

**Acceptance Criteria:**

**Given** I have a project
**When** I link it to a client contact
**Then** the relationship is saved
**And** I can view all projects for a client
**And** I can view the client from the project

---

### Story 4.3: Project Status and Milestones

As a project manager,
I want to set project status and milestones,
So that I can track progress.

**Acceptance Criteria:**

**Given** I have a project
**When** I update status or add milestones
**Then** changes are saved
**And** milestones show completion percentage
**And** status is visible in project list

---

### Story 4.4: Task CRUD Operations

As a user,
I want to create, view, edit, and delete tasks,
So that I can manage my to-dos.

**Acceptance Criteria:**

**Given** I am logged in
**When** I create a task with title
**Then** the task is saved
**And** I can set priority and due date
**And** I can edit and delete tasks

---

### Story 4.5: Task Linking

As a user,
I want to link tasks to contacts or projects,
So that I can organize work by context.

**Acceptance Criteria:**

**Given** I have a task
**When** I link it to a contact or project
**Then** the relationship is saved
**And** I can view all tasks for a contact/project
**And** tasks can be standalone

---

### Story 4.6: Task Kanban View

As a user,
I want to view tasks in Kanban board,
So that I can visualize my workflow.

**Acceptance Criteria:**

**Given** I have tasks with different statuses
**When** I open Kanban view
**Then** tasks are organized by status columns
**And** I can drag tasks between columns
**And** list view is also available

---

### Story 4.7: Subtasks and Checklists

As a user,
I want to create subtasks within a task,
So that I can break down complex work.

**Acceptance Criteria:**

**Given** I have a task
**When** I add subtasks
**Then** they appear as a checklist
**And** completing subtasks updates progress
**And** parent task shows completion percentage

---

## Epic 5: AI Chat Core

Users can have AI conversations with model selection and streaming.

### Story 5.1: AI Chat Interface

As a user,
I want to open an AI chat conversation,
So that I can interact with the AI assistant.

**Acceptance Criteria:**

**Given** I am logged in
**When** I open the chat interface
**Then** I see a chat UI with message input
**And** I can send messages
**And** conversation is saved to my account

---

### Story 5.2: AI Model Selection

As a user,
I want to select which AI model to use,
So that I can choose based on my needs.

**Acceptance Criteria:**

**Given** I am in a chat
**When** I select a different model
**Then** subsequent messages use that model
**And** available models are displayed
**And** model capabilities are shown

---

### Story 5.3: Streaming AI Responses

As a user,
I want to see AI responses stream in real-time,
So that I don't wait for the full response.

**Acceptance Criteria:**

**Given** I send a message
**When** the AI responds
**Then** text streams token by token
**And** I can see the response building
**And** streaming feels responsive

---

### Story 5.4: Conversation History

As a user,
I want to view my conversation history,
So that I can reference past interactions.

**Acceptance Criteria:**

**Given** I have past conversations
**When** I open conversation history
**Then** I see a list of conversations
**And** I can open and continue any conversation
**And** conversations are searchable

---

### Story 5.5: Multiple Parallel Chats

As a user,
I want to have multiple chat conversations open,
So that I can work on different topics.

**Acceptance Criteria:**

**Given** I have one chat open
**When** I create a new chat
**Then** both chats are accessible
**And** I can switch between them
**And** each has its own context

---

## Epic 6: RAG & Knowledge Base

Users can upload documents for AI-powered queries.

### Story 6.1: Document Upload

As a user,
I want to upload documents (PDF, TXT, MD),
So that the AI can reference them.

**Acceptance Criteria:**

**Given** I am in document management
**When** I upload a file
**Then** it is stored in my organization
**And** supported formats are validated
**And** upload progress is shown

---

### Story 6.2: Document Chunking and Embedding

As a system,
I want to automatically chunk and embed documents,
So that they can be searched semantically.

**Acceptance Criteria:**

**Given** a document is uploaded
**When** processing completes
**Then** document is chunked into segments
**And** embeddings are stored in pgvector
**And** document shows "indexed" status

---

### Story 6.3: RAG-Powered Queries

As a user,
I want to query my documents through AI chat,
So that the AI uses my knowledge base.

**Acceptance Criteria:**

**Given** I have indexed documents
**When** I ask a question in chat
**Then** relevant document chunks are retrieved
**And** AI response incorporates the content
**And** response is contextually accurate

---

### Story 6.4: Source Citations

As a user,
I want AI responses to cite sources,
So that I can verify information.

**Acceptance Criteria:**

**Given** AI uses RAG content
**When** the response is generated
**Then** source documents are cited
**And** I can click to view the source
**And** citations are clearly formatted

---

### Story 6.5: Document Management

As a user,
I want to manage my uploaded documents,
So that I can organize my knowledge base.

**Acceptance Criteria:**

**Given** I have documents
**When** I open document management
**Then** I can view, rename, and delete documents
**And** storage usage is displayed
**And** re-indexing is available

---

## Epic 7: Directives & Context

Users can guide AI behavior with directives and context.

### Story 7.1: Create Organizational Directives

As an admin,
I want to create directives (SOPs),
So that AI follows organizational guidelines.

**Acceptance Criteria:**

**Given** I am an Admin or Owner
**When** I create a directive
**Then** it is saved with title and content
**And** it is available to all org members
**And** I can edit and delete it

---

### Story 7.2: Attach Context to Conversations

As a user,
I want to attach context (contacts, projects, files) to chats,
So that AI has relevant information.

**Acceptance Criteria:**

**Given** I am in a chat
**When** I attach a contact or project
**Then** that context is available to AI
**And** I can see what is attached
**And** I can remove attachments

---

### Story 7.3: Attach Directives to Conversations

As a user,
I want to attach directives to chats,
So that AI follows specific guidelines.

**Acceptance Criteria:**

**Given** I am in a chat with available directives
**When** I attach a directive
**Then** AI receives directive content as context
**And** responses follow the directive
**And** I can see active directives

---

### Story 7.4: AI Directive Following

As a user,
I want AI to follow attached directives,
So that responses match my organization's style.

**Acceptance Criteria:**

**Given** a directive is attached
**When** AI generates a response
**Then** it follows the directive guidelines
**And** tone and format match expectations
**And** directive content is not exposed to user

---

## Epic 8: AI Actions & Execution

AI can draft emails, suggest tasks, and trigger webhooks.

### Story 8.1: AI Email Drafting

As a user,
I want AI to draft emails based on context,
So that I can quickly compose messages.

**Acceptance Criteria:**

**Given** I have a contact in context
**When** I ask AI to draft an email
**Then** AI generates appropriate email content
**And** I can review before sending
**And** email uses contact information

---

### Story 8.2: AI Task Suggestions

As a user,
I want AI to suggest tasks from conversation,
So that action items are captured.

**Acceptance Criteria:**

**Given** we discuss action items in chat
**When** AI suggests tasks
**Then** I see task recommendations
**And** I can approve to create them
**And** tasks are linked to context

---

### Story 8.3: AI CRM Field Updates

As a user,
I want AI to update CRM fields with my confirmation,
So that data stays current.

**Acceptance Criteria:**

**Given** new information is discussed
**When** AI suggests an update
**Then** I see the proposed change
**And** I can approve or reject
**And** approved changes are saved

---

### Story 8.4: AI Email Sending

As a user,
I want AI to send emails with my confirmation,
So that outreach is executed.

**Acceptance Criteria:**

**Given** an email draft is ready
**When** I confirm sending
**Then** the email is sent via Resend
**And** I see confirmation
**And** activity is logged

---

### Story 8.5: Webhook Actions

As a user,
I want AI to trigger webhooks,
So that external systems are updated.

**Acceptance Criteria:**

**Given** webhooks are configured
**When** AI triggers a webhook
**Then** payload is sent to the endpoint
**And** I see confirmation
**And** failures are handled gracefully

---

## Epic 9: Document Generation

Users can generate PDF proposals from templates.

### Story 9.1: Proposal Template Creation

As an admin,
I want to create proposal templates,
So that documents follow consistent formats.

**Acceptance Criteria:**

**Given** I am an Admin
**When** I create a template
**Then** I can define layout and placeholders
**And** templates are saved to org
**And** I can edit and delete templates

---

### Story 9.2: Generate PDF Proposal

As a user,
I want to generate a PDF proposal for a client,
So that I can send professional documents.

**Acceptance Criteria:**

**Given** I have a template and client
**When** I generate a proposal
**Then** placeholders are filled with client data
**And** PDF is rendered correctly
**And** generation is reasonably fast

---

### Story 9.3: Preview and Download Documents

As a user,
I want to preview and download generated documents,
So that I can review before sharing.

**Acceptance Criteria:**

**Given** a document is generated
**When** I preview it
**Then** I see the rendered PDF
**And** I can download it
**And** I can regenerate if needed

---

## Epic 10: Billing & Subscriptions

Users can manage subscription plans and token usage.

### Story 10.1: Token Usage Tracking

As a user,
I want to see my token usage,
So that I can monitor my AI consumption.

**Acceptance Criteria:**

**Given** I use AI features
**When** I view usage dashboard
**Then** I see tokens used per model
**And** usage history is available
**And** remaining balance is shown

---

### Story 10.2: Plan Management

As a user,
I want to view and manage my subscription plan,
So that I can adjust as needed.

**Acceptance Criteria:**

**Given** I have a subscription
**When** I view billing settings
**Then** I see my current plan
**And** I can upgrade or downgrade
**And** changes take effect appropriately

---

### Story 10.3: Token Pack Purchase

As a user,
I want to purchase additional tokens,
So that I can continue using AI when limits are reached.

**Acceptance Criteria:**

**Given** I need more tokens
**When** I purchase a token pack
**Then** Stripe checkout is initiated
**And** upon success, tokens are added
**And** purchase is recorded

---

### Story 10.4: Token Limit Enforcement

As a system,
I want to enforce token limits per plan,
So that usage stays within subscription.

**Acceptance Criteria:**

**Given** a user reaches their token limit
**When** they try to use AI
**Then** they are notified of the limit
**And** they are prompted to upgrade or purchase
**And** no AI requests are processed until resolved

---

### Story 10.5: Stripe Webhook Integration

As a system,
I want to sync with Stripe via webhooks,
So that billing status is always current.

**Acceptance Criteria:**

**Given** Stripe events occur (payment, subscription change)
**When** webhook is received
**Then** local database is updated
**And** user sees current status
**And** webhook signature is verified

---

<!-- End of Epic Breakdown -->


