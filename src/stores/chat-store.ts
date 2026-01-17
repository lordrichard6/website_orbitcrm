import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Conversation, Message, CreateConversationInput } from '@/types/chat'

interface ChatStore {
    conversations: Conversation[]
    activeConversationId: string | null
    createConversation: (input?: CreateConversationInput) => Conversation
    deleteConversation: (id: string) => void
    setActiveConversation: (id: string | null) => void
    addMessage: (conversationId: string, message: Omit<Message, 'id' | 'createdAt'>) => Message
    getConversation: (id: string) => Conversation | undefined
    updateConversationTitle: (id: string, title: string) => void
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            conversations: [],
            activeConversationId: null,

            createConversation: (input) => {
                const newConversation: Conversation = {
                    id: crypto.randomUUID(),
                    title: input?.title || 'New Conversation',
                    messages: [],
                    model: input?.model || 'gpt-4o-mini',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                set((state) => ({
                    conversations: [...state.conversations, newConversation],
                    activeConversationId: newConversation.id,
                }))
                return newConversation
            },

            deleteConversation: (id) => {
                set((state) => ({
                    conversations: state.conversations.filter((c) => c.id !== id),
                    activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
                }))
            },

            setActiveConversation: (id) => {
                set({ activeConversationId: id })
            },

            addMessage: (conversationId, messageInput) => {
                const newMessage: Message = {
                    id: crypto.randomUUID(),
                    ...messageInput,
                    createdAt: new Date(),
                }
                set((state) => ({
                    conversations: state.conversations.map((c) =>
                        c.id === conversationId
                            ? {
                                ...c,
                                messages: [...c.messages, newMessage],
                                updatedAt: new Date(),
                                // Auto-title from first user message
                                title: c.messages.length === 0 && messageInput.role === 'user'
                                    ? messageInput.content.slice(0, 30) + (messageInput.content.length > 30 ? '...' : '')
                                    : c.title,
                            }
                            : c
                    ),
                }))
                return newMessage
            },

            getConversation: (id) => {
                return get().conversations.find((c) => c.id === id)
            },

            updateConversationTitle: (id, title) => {
                set((state) => ({
                    conversations: state.conversations.map((c) =>
                        c.id === id ? { ...c, title, updatedAt: new Date() } : c
                    ),
                }))
            },
        }),
        {
            name: 'orbitcrm-chat',
        }
    )
)
