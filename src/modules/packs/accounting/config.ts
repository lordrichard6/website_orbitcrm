/**
 * Accounting Pack Configuration
 * 
 * For accountants and fiduciaries who need client vaults,
 * tax calendars, and compliance workflows.
 */

import { PackConfig } from '../index';

export const accountingPackConfig: PackConfig = {
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
};

export interface ClientVaultItem {
  id: string;
  orgId: string;
  contactId: string;
  documentId: string;
  category: 'tax_return' | 'financial_statement' | 'contract' | 'correspondence' | 'other';
  year?: number;
  confidential: boolean;
  expiresAt?: Date;
  createdAt: Date;
}

export interface TaxDeadline {
  id: string;
  orgId: string;
  contactId?: string; // null for general deadlines
  title: string;
  description?: string;
  dueDate: Date;
  type: 'vat' | 'income_tax' | 'corporate_tax' | 'payroll' | 'other';
  status: 'pending' | 'completed' | 'extended';
  reminderDays: number[];
  createdAt: Date;
}

export interface DocumentRequest {
  id: string;
  orgId: string;
  contactId: string;
  title: string;
  description?: string;
  requestedDocuments: string[];
  dueDate: Date;
  status: 'pending' | 'partial' | 'complete';
  sentAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface ComplianceChecklist {
  id: string;
  orgId: string;
  contactId: string;
  name: string;
  items: ComplianceItem[];
  completedAt?: Date;
  createdAt: Date;
}

export interface ComplianceItem {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
}
