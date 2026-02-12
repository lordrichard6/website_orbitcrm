/**
 * Agency Pack
 * 
 * Provides team capacity, retainer tracking, and client reporting.
 * Status: Coming Soon
 */

export { agencyPackConfig } from './config';
export type { 
  TeamMemberCapacity, 
  Retainer, 
  RetainerUsage, 
  ClientReport,
  ReportSection,
  ProjectProfitability 
} from './config';

// Feature flags for this pack
export const agencyFeatures = {
  capacityPlanning: false, // Coming soon
  retainerTracking: false,
  clientReports: false,
  profitabilityAnalysis: false,
  resourceAllocation: false,
} as const;
