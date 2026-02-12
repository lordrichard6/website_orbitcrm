/**
 * Consultant Pack Configuration
 * 
 * For consultants and agencies who need SOW templates,
 * hourly tracking, and AI proposal generation.
 */

import { PackConfig } from '../index';

export const consultantPackConfig: PackConfig = {
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
};

export interface SOWTemplate {
  id: string;
  orgId: string;
  name: string;
  content: string;
  variables: string[]; // e.g., ['client_name', 'project_scope', 'hourly_rate']
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  orgId: string;
  projectId: string;
  contactId?: string;
  userId: string;
  description: string;
  hours: number;
  hourlyRate: number;
  date: Date;
  billable: boolean;
  invoiceId?: string;
  createdAt: Date;
}

export interface BillingSummary {
  projectId: string;
  totalHours: number;
  billableHours: number;
  totalAmount: number;
  invoicedAmount: number;
  outstandingAmount: number;
}
