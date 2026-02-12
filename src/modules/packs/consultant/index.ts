/**
 * Consultant Pack
 * 
 * Provides SOW templates, hourly tracking, and AI proposal generation.
 */

export { consultantPackConfig } from './config';
export type { SOWTemplate, TimeEntry, BillingSummary } from './config';

// Feature flags for this pack
export const consultantFeatures = {
  sowTemplates: true,
  hourlyTracking: true,
  timeLogging: true,
  proposalAi: true,
  billingSummaries: true,
} as const;
