/**
 * Agency Pack Configuration
 * 
 * For marketing and creative agencies who need team capacity,
 * retainer tracking, and client reporting.
 */

import { PackConfig } from '../index';

export const agencyPackConfig: PackConfig = {
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
};

export interface TeamMemberCapacity {
  id: string;
  orgId: string;
  userId: string;
  weekStartDate: Date;
  totalHours: number;
  allocatedHours: number;
  availableHours: number;
}

export interface Retainer {
  id: string;
  orgId: string;
  contactId: string;
  name: string;
  monthlyHours: number;
  monthlyRate: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'cancelled';
  rolloverHours: boolean;
  maxRolloverHours?: number;
  createdAt: Date;
}

export interface RetainerUsage {
  id: string;
  retainerId: string;
  month: string; // YYYY-MM
  hoursUsed: number;
  hoursRemaining: number;
  rolledOverHours: number;
}

export interface ClientReport {
  id: string;
  orgId: string;
  contactId: string;
  title: string;
  period: string; // e.g., "2026-Q1"
  sections: ReportSection[];
  generatedAt: Date;
  sentAt?: Date;
}

export interface ReportSection {
  type: 'summary' | 'hours' | 'deliverables' | 'financials' | 'custom';
  title: string;
  content: string;
}

export interface ProjectProfitability {
  projectId: string;
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
  hoursPlanned: number;
  hoursActual: number;
  efficiency: number;
}
