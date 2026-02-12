# OrbitCRM Pricing Strategy

## Overview

OrbitCRM uses a tiered subscription model with usage-based AI token metering. Vertical packs provide premium industry-specific features that justify higher tiers.

---

## Subscription Tiers

### Free Tier (€0/month)

**Target:** Freelancers evaluating the platform, very small operations

**Included:**
- All core modules (Contacts, Tasks, Invoicing, AI Chat, RAG)
- 1 user
- 1,000 AI tokens/month
- GPT-4o Mini only
- 1GB document storage
- Swiss QR-Bill + EU IBAN invoicing
- Email support

**Limitations:**
- No vertical packs
- No team features
- Token limit enforced (upgrade prompt at 80%)

---

### Pro Tier (€29/month)

**Target:** Solo consultants, freelancers, small professional services

**Included:**
- Everything in Free
- 50,000 AI tokens/month
- All AI models (GPT-4o, Claude 3.5 Sonnet, Gemini Pro)
- **1 vertical pack of choice**
- 10GB document storage
- Basic usage analytics
- Priority email support

**Vertical Pack Options:**
- Consultant Pack (SOW templates, hourly tracking)
- Insurance Pack (policy tracking, renewals) - Coming Soon
- Accounting Pack (client vault, tax calendar) - Coming Soon
- Agency Pack (retainers, capacity) - Coming Soon

---

### Business Tier (€79/month)

**Target:** SME teams, growing agencies, multi-person firms

**Included:**
- Everything in Pro
- Unlimited AI tokens
- **All vertical packs included**
- Up to 10 users
- 50GB document storage
- Advanced analytics dashboard
- Team collaboration features
- API access
- Priority support with SLA

---

## Token Economy

### What Counts as a Token?
- AI input tokens (your messages + context)
- AI output tokens (AI responses)
- Embedding tokens (document processing)

### Token Costs by Model

| Model | Tier Required | Token Multiplier |
|-------|--------------|------------------|
| GPT-4o Mini | Free | 1x |
| GPT-4o | Pro | 3x |
| Claude 3.5 Sonnet | Pro | 3x |
| Gemini Pro | Pro | 2x |
| Claude 3 Opus | Business | 5x |

**Example:** A 1,000 token conversation with GPT-4o uses 3,000 of your monthly allocation.

### Token Packs (Add-on)

For users who exceed their monthly allocation:

| Pack | Tokens | Price | Per 1K Tokens |
|------|--------|-------|---------------|
| Starter | 25,000 | €10 | €0.40 |
| Plus | 100,000 | €35 | €0.35 |
| Pro | 500,000 | €150 | €0.30 |

Token packs never expire and roll over month to month.

---

## Billing Implementation

### Stripe Products

```
Products:
├── orbitcrm_free          # Free tier (€0)
├── orbitcrm_pro           # Pro tier (€29/mo)
├── orbitcrm_business      # Business tier (€79/mo)
├── token_pack_starter     # 25K tokens (€10)
├── token_pack_plus        # 100K tokens (€35)
└── token_pack_pro         # 500K tokens (€150)
```

### Database Schema

```sql
-- Organizations subscription state
organizations (
  subscription_tier TEXT DEFAULT 'free', -- 'free' | 'pro' | 'business'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  token_balance INT DEFAULT 1000,        -- Monthly allocation
  token_pack_balance INT DEFAULT 0,      -- Purchased tokens
  enabled_packs TEXT[] DEFAULT '{}',     -- ['consultant', 'agency']
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP
)

-- Usage tracking
usage_logs (
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  model TEXT,
  tokens_in INT,
  tokens_out INT,
  multiplier FLOAT,
  effective_tokens INT,                  -- tokens * multiplier
  created_at TIMESTAMP DEFAULT NOW()
)
```

### Webhook Events to Handle

```typescript
const stripeWebhooks = [
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'checkout.session.completed', // For token packs
];
```

---

## Upgrade Triggers

### Soft Limits (Prompts)
- 80% of token allocation used
- Attempting to use premium AI model on Free tier
- Attempting to enable vertical pack on Free tier
- Trying to invite team member on Free/Pro tier

### Hard Limits (Blocked)
- 100% of token allocation used
- 10 user limit on Business tier

---

## Pricing Page Copy

### Headline
> "AI that works as hard as you do"

### Subheadline
> "Start free. Scale as you grow. No hidden fees."

### Feature Comparison Matrix

| Feature | Free | Pro | Business |
|---------|------|-----|----------|
| AI Chat | ✓ | ✓ | ✓ |
| Contacts & Pipeline | ✓ | ✓ | ✓ |
| Invoicing (Swiss/EU) | ✓ | ✓ | ✓ |
| RAG Knowledge Base | ✓ | ✓ | ✓ |
| AI Tokens/month | 1K | 50K | Unlimited |
| AI Models | GPT-4o Mini | All Models | All Models |
| Vertical Packs | - | 1 Pack | All Packs |
| Team Members | 1 | 1 | 10 |
| Storage | 1GB | 10GB | 50GB |
| Support | Email | Priority | SLA |

---

## Revenue Projections

### Assumptions
- Month 6: 40 WAU (10% conversion from free)
- Average Pro subscription: 70%
- Average Business subscription: 30%

### Month 6 Target
```
Free users: 360 (90%)
Pro users: 28 (7%) × €29 = €812
Business users: 12 (3%) × €79 = €948
Token packs: ~€200/month

Total MRR: ~€2,000 (target: €3,000)
```

### Path to €3K MRR
- Increase conversion rate to 12%
- Or increase business tier adoption
- Or add annual plans at 20% discount

---

## Annual Plans

**Coming Soon:** 20% discount for annual billing

| Tier | Monthly | Annual (Save 20%) |
|------|---------|-------------------|
| Pro | €29/mo | €278/year (€23/mo) |
| Business | €79/mo | €758/year (€63/mo) |

---

## Enterprise (Future)

For organizations with 10+ users or custom requirements:
- Custom user limits
- Custom token allocations
- SSO/SAML
- Dedicated support
- Custom integrations
- On-premises option

**Pricing:** Contact sales (starting at €500/month)
