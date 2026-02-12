/**
 * Accounting Pack
 * 
 * Provides client vault, tax calendar, and compliance workflows.
 * Status: Coming Soon
 */

export { accountingPackConfig } from './config';
export type { 
  ClientVaultItem, 
  TaxDeadline, 
  DocumentRequest, 
  ComplianceChecklist,
  ComplianceItem 
} from './config';

// Feature flags for this pack
export const accountingFeatures = {
  clientVault: false, // Coming soon
  taxCalendar: false,
  documentRequests: false,
  complianceChecklists: false,
  multiEntity: false,
} as const;
