// Chat types for OrbitCRM

export interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt: Date
}

export interface Conversation {
    id: string
    title: string
    messages: Message[]
    model: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateConversationInput {
    title?: string
    model?: string
}

export const AVAILABLE_MODELS = [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
] as const
