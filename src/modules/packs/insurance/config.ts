/**
 * Insurance Pack Configuration
 * 
 * For insurance brokers who need policy tracking,
 * renewal alerts, and commission management.
 */

import { PackConfig } from '../index';

export const insurancePackConfig: PackConfig = {
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
};

export interface Policy {
  id: string;
  orgId: string;
  contactId: string;
  policyNumber: string;
  provider: string;
  type: 'life' | 'health' | 'property' | 'liability' | 'vehicle' | 'other';
  premium: number;
  premiumFrequency: 'monthly' | 'quarterly' | 'annual';
  startDate: Date;
  endDate: Date;
  renewalDate: Date;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  commissionRate: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RenewalAlert {
  id: string;
  policyId: string;
  alertDate: Date;
  alertType: 'email' | 'in_app' | 'both';
  sent: boolean;
  sentAt?: Date;
}

export interface Commission {
  id: string;
  policyId: string;
  amount: number;
  type: 'initial' | 'renewal' | 'bonus';
  date: Date;
  paid: boolean;
  paidAt?: Date;
}
