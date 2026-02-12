# Vertical Packs

Vertical packs are premium modules that provide industry-specific functionality. They can be enabled per tenant based on subscription tier.

## Available Packs

### consultant/
**Target:** Consultants, Agencies
**Minimum Tier:** Pro (€29/mo)

Features:
- SOW/Proposal templates
- Hourly rate tracking
- Time logging
- AI proposal generation
- Project billing summaries

### insurance/
**Target:** Insurance Brokers
**Minimum Tier:** Pro (€29/mo)

Features:
- Policy tracking
- Renewal alerts
- Commission calculations
- Client risk profiles
- Document categorization (policies, claims)

### accounting/
**Target:** Accountants, Fiduciaries
**Minimum Tier:** Pro (€29/mo)

Features:
- Client document vault
- Tax calendar with reminders
- Document request workflows
- Compliance checklists
- Multi-entity management

### agency/
**Target:** Marketing/Creative Agencies
**Minimum Tier:** Pro (€29/mo)

Features:
- Team capacity planning
- Retainer tracking
- Client reporting dashboards
- Project profitability analysis
- Resource allocation

## Pack Activation

Packs are enabled per tenant in the `organizations.enabled_packs` array:

```sql
UPDATE organizations 
SET enabled_packs = ARRAY['consultant', 'agency']
WHERE id = 'tenant-uuid';
```

## Creating a New Pack

1. Create a new directory under `/packs`
2. Add required files:
   - `config.ts` - Pack configuration
   - `index.ts` - Module exports
   - `types.ts` - TypeScript types
   - `README.md` - Documentation
3. Add database migrations if needed
4. Register pack in the pack registry

## Pack Configuration Schema

```typescript
export interface PackConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  minimumTier: 'pro' | 'business';
  icon: string;
  comingSoon?: boolean;
}
```
