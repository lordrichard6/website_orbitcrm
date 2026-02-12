/**
 * Core Modules Index
 * 
 * Re-exports all core module functionality.
 * Core modules are always enabled for all tenants.
 */

// Module configs
export const coreModules = [
  'contacts',
  'projects',
  'invoicing',
  'ai-chat',
  'rag',
  'tasks',
] as const;

export type CoreModule = typeof coreModules[number];

// Feature flags for core modules
export const coreFeatures = {
  contacts: {
    pipeline: true,
    tags: true,
    notes: true,
    search: true,
    companyLookup: true, // Zefix CH
  },
  projects: {
    clientLinking: true,
    statusTracking: true,
    deadlines: true,
  },
  invoicing: {
    swissQrBill: true,
    euIban: true,
    pdfExport: true,
    stripeTracking: true,
  },
  aiChat: {
    multiModel: true,
    streaming: true,
    history: true,
    contextAttachment: true,
    tokenMetering: true,
  },
  rag: {
    documentUpload: true,
    embedding: true,
    vectorSearch: true,
    citations: true,
  },
  tasks: {
    contactLinking: true,
    projectLinking: true,
    priorities: true,
    dueDates: true,
  },
} as const;
