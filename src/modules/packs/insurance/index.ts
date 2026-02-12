/**
 * Insurance Pack
 * 
 * Provides policy tracking, renewal alerts, and commission management.
 * Status: Coming Soon
 */

export { insurancePackConfig } from './config';
export type { Policy, RenewalAlert, Commission } from './config';

// Feature flags for this pack
export const insuranceFeatures = {
  policyTracking: false, // Coming soon
  renewalAlerts: false,
  commissionCalc: false,
  riskProfiles: false,
  documentCategorization: false,
} as const;
