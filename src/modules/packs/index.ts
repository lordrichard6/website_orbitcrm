/**
 * Vertical Packs Index
 * 
 * Registry of all available vertical packs.
 * Packs are opt-in per tenant based on subscription tier.
 */

export interface PackConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  minimumTier: 'pro' | 'business';
  icon: string;
  comingSoon?: boolean;
}

export const packRegistry: PackConfig[] = [
  {
    id: 'consultant',
    name: 'Consultant Pack',
    description: 'SOW templates, hourly tracking, and AI proposal generation',
    features: [
      'sow_templates',
      'hourly_tracking',
      'time_logging',
      'proposal_ai',
      'billing_summaries',
    ],
    minimumTier: 'pro',
    icon: 'briefcase',
  },
  {
    id: 'insurance',
    name: 'Insurance Pack',
    description: 'Policy tracking, renewal alerts, and commission management',
    features: [
      'policy_tracking',
      'renewal_alerts',
      'commission_calc',
      'risk_profiles',
      'document_categorization',
    ],
    minimumTier: 'pro',
    icon: 'shield',
    comingSoon: true,
  },
  {
    id: 'accounting',
    name: 'Accounting Pack',
    description: 'Client vault, tax calendar, and compliance workflows',
    features: [
      'client_vault',
      'tax_calendar',
      'document_requests',
      'compliance_checklists',
      'multi_entity',
    ],
    minimumTier: 'pro',
    icon: 'calculator',
    comingSoon: true,
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    description: 'Team capacity, retainer tracking, and client reporting',
    features: [
      'capacity_planning',
      'retainer_tracking',
      'client_reports',
      'profitability_analysis',
      'resource_allocation',
    ],
    minimumTier: 'pro',
    icon: 'users',
    comingSoon: true,
  },
];

export type PackId = typeof packRegistry[number]['id'];

/**
 * Check if a tenant has access to a pack
 */
export function hasPackAccess(
  enabledPacks: string[],
  packId: string,
  subscriptionTier: 'free' | 'pro' | 'business'
): boolean {
  const pack = packRegistry.find(p => p.id === packId);
  if (!pack) return false;
  
  // Check if pack is enabled for tenant
  if (!enabledPacks.includes(packId)) return false;
  
  // Check tier requirements
  if (subscriptionTier === 'free') return false;
  if (pack.minimumTier === 'business' && subscriptionTier === 'pro') return false;
  
  return true;
}

/**
 * Get available packs for a tier
 */
export function getAvailablePacks(subscriptionTier: 'free' | 'pro' | 'business'): PackConfig[] {
  if (subscriptionTier === 'free') return [];
  
  return packRegistry.filter(pack => {
    if (pack.comingSoon) return false;
    if (pack.minimumTier === 'business' && subscriptionTier === 'pro') return false;
    return true;
  });
}
