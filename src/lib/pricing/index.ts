/**
 * OrbitCRM Pricing Configuration
 * 
 * Defines subscription tiers, token allocations, and model access.
 */

export type SubscriptionTier = 'free' | 'pro' | 'business';

export interface TierConfig {
  id: SubscriptionTier;
  name: string;
  price: number; // EUR per month
  tokenAllocation: number;
  maxUsers: number;
  storageGb: number;
  availableModels: AIModel[];
  maxPacks: number;
  features: string[];
}

export type AIModel = 
  | 'gpt-4o-mini'
  | 'gpt-4o'
  | 'claude-3-5-sonnet'
  | 'claude-3-opus'
  | 'gemini-pro';

export interface ModelConfig {
  id: AIModel;
  name: string;
  provider: 'openai' | 'anthropic' | 'google';
  minimumTier: SubscriptionTier;
  tokenMultiplier: number;
  description: string;
}

// Tier configurations
export const tiers: Record<SubscriptionTier, TierConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    tokenAllocation: 1000,
    maxUsers: 1,
    storageGb: 1,
    availableModels: ['gpt-4o-mini'],
    maxPacks: 0,
    features: [
      'Core modules (Contacts, Tasks, Invoicing)',
      'AI Chat with GPT-4o Mini',
      'RAG Knowledge Base',
      'Swiss QR-Bill invoicing',
      'EU IBAN invoicing',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    tokenAllocation: 50000,
    maxUsers: 1,
    storageGb: 10,
    availableModels: ['gpt-4o-mini', 'gpt-4o', 'claude-3-5-sonnet', 'gemini-pro'],
    maxPacks: 1,
    features: [
      'Everything in Free',
      '50K AI tokens/month',
      'All AI models',
      '1 vertical pack of choice',
      'Priority email support',
    ],
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 79,
    tokenAllocation: -1, // Unlimited
    maxUsers: 10,
    storageGb: 50,
    availableModels: ['gpt-4o-mini', 'gpt-4o', 'claude-3-5-sonnet', 'claude-3-opus', 'gemini-pro'],
    maxPacks: -1, // Unlimited
    features: [
      'Everything in Pro',
      'Unlimited AI tokens',
      'All vertical packs',
      'Up to 10 users',
      'Team collaboration',
      'API access',
      'SLA support',
    ],
  },
};

// Model configurations
export const models: Record<AIModel, ModelConfig> = {
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    minimumTier: 'free',
    tokenMultiplier: 1,
    description: 'Fast and efficient for everyday tasks',
  },
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    minimumTier: 'pro',
    tokenMultiplier: 3,
    description: 'Balanced quality and speed',
  },
  'claude-3-5-sonnet': {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    minimumTier: 'pro',
    tokenMultiplier: 3,
    description: 'Excellent for writing and analysis',
  },
  'claude-3-opus': {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    minimumTier: 'business',
    tokenMultiplier: 5,
    description: 'Premium quality for complex tasks',
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    minimumTier: 'pro',
    tokenMultiplier: 2,
    description: 'Google AI with broad knowledge',
  },
};

// Token pack configurations
export interface TokenPack {
  id: string;
  name: string;
  tokens: number;
  price: number;
  pricePerThousand: number;
}

export const tokenPacks: TokenPack[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    tokens: 25000,
    price: 10,
    pricePerThousand: 0.40,
  },
  {
    id: 'plus',
    name: 'Plus Pack',
    tokens: 100000,
    price: 35,
    pricePerThousand: 0.35,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    tokens: 500000,
    price: 150,
    pricePerThousand: 0.30,
  },
];

// Utility functions

/**
 * Check if a user can access a specific model
 */
export function canAccessModel(tier: SubscriptionTier, modelId: AIModel): boolean {
  const model = models[modelId];
  const tierOrder: SubscriptionTier[] = ['free', 'pro', 'business'];
  return tierOrder.indexOf(tier) >= tierOrder.indexOf(model.minimumTier);
}

/**
 * Get available models for a tier
 */
export function getAvailableModels(tier: SubscriptionTier): ModelConfig[] {
  return Object.values(models).filter(model => canAccessModel(tier, model.id));
}

/**
 * Calculate effective token cost
 */
export function calculateTokenCost(tokens: number, modelId: AIModel): number {
  const model = models[modelId];
  return Math.ceil(tokens * model.tokenMultiplier);
}

/**
 * Check if organization has sufficient tokens
 */
export function hasTokens(
  monthlyBalance: number,
  packBalance: number,
  required: number,
  tier: SubscriptionTier
): boolean {
  if (tier === 'business') return true; // Unlimited
  return (monthlyBalance + packBalance) >= required;
}

/**
 * Get tier upgrade suggestion
 */
export function getSuggestedUpgrade(
  currentTier: SubscriptionTier,
  reason: 'tokens' | 'models' | 'packs' | 'users'
): SubscriptionTier | null {
  if (currentTier === 'business') return null;
  if (currentTier === 'pro') return 'business';
  return 'pro';
}
