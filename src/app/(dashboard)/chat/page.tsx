'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/stores/chat-store'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AVAILABLE_MODELS } from '@/types/chat'
import { cn } from '@/lib/utils'
import { Plus, Send, Bot, X, MessageSquare } from 'lucide-react'

// Mock AI responses for demo (will be replaced with real AI when API keys are added)
const mockResponses = [
    "I understand. Let me help you with that. As your CRM assistant, I can help you manage contacts, projects, and tasks.",
    "That's a great question! Based on the context, I'd suggest focusing on building stronger client relationships first.",
    "I've analyzed the information. Here are some insights that might be helpful for your business.",
    "I can help you draft an email, create a task, or update your CRM records. What would you like to do?",
    "Let me think about that... I recommend breaking this down into smaller, manageable steps.",
]

export default function ChatPage() {
    const {
        conversations,
        activeConversationId,
        createConversation,
        deleteConversation,
        setActiveConversation,
        addMessage,
        getConversation
    } = useChatStore()

    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const activeConversation = activeConversationId ? getConversation(activeConversationId) : null

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [activeConversation?.messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        let conversationId = activeConversationId
        if (!conversationId) {
            const newConv = createConversation()
            conversationId = newConv.id
        }

        // Add user message
        addMessage(conversationId, { role: 'user', content: input })
        setInput('')
        setIsLoading(true)

        // Simulate AI response delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

        // Add mock AI response
        const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
        addMessage(conversationId, { role: 'assistant', content: mockResponse })
        setIsLoading(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#3D4A67]">AI Chat</h1>
                    <p className="text-slate-600">Your intelligent CRM assistant</p>
                </div>
                <Button
                    className="bg-[#D1855C] hover:bg-[#B1653C] text-white gap-2"
                    onClick={() => createConversation()}
                >
                    <Plus className="h-4 w-4" />
                    New Chat
                </Button>
            </div>

            <div className="flex flex-1 gap-4 pt-4 overflow-hidden">
                {/* Conversations List */}
                <Card className="w-64 flex-shrink-0 border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-4 h-full overflow-y-auto">
                        <h3 className="mb-4 font-semibold text-[#3D4A67] flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Conversations
                        </h3>
                        {conversations.length === 0 ? (
                            <p className="text-sm text-slate-500">No conversations yet</p>
                        ) : (
                            <div className="space-y-2">
                                {conversations.slice().reverse().map((conv) => (
                                    <div
                                        key={conv.id}
                                        className={cn(
                                            "p-2 rounded-lg cursor-pointer text-sm group flex justify-between items-start transition-colors",
                                            activeConversationId === conv.id
                                                ? "bg-[#3D4A67]/10 text-[#3D4A67]"
                                                : "hover:bg-slate-100 text-slate-700"
                                        )}
                                        onClick={() => setActiveConversation(conv.id)}
                                    >
                                        <span className="truncate flex-1">{conv.title}</span>
                                        <button
                                            className="opacity-0 group-hover:opacity-100 text-[#D1855C] hover:text-[#B1653C] ml-2"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteConversation(conv.id)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Chat Area */}
                <div className="flex flex-1 flex-col min-w-0">
                    <Card className="flex-1 border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                        {activeConversation ? (
                            <>
                                {/* Model selector */}
                                <div className="p-3 border-b border-slate-200 flex items-center gap-2">
                                    <span className="text-sm text-slate-600">Model:</span>
                                    <Select value={activeConversation.model} disabled>
                                        <SelectTrigger className="w-40 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {AVAILABLE_MODELS.map((model) => (
                                                <SelectItem key={model.id} value={model.id}>
                                                    {model.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <span className="text-xs text-[#E9B949] ml-2">
                                        Demo mode - using mock responses
                                    </span>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {activeConversation.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={cn(
                                                "flex",
                                                message.role === 'user' ? 'justify-end' : 'justify-start'
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[80%] rounded-lg px-4 py-2",
                                                    message.role === 'user'
                                                        ? 'bg-[#3D4A67] text-white'
                                                        : 'bg-slate-100 text-slate-900'
                                                )}
                                            >
                                                {message.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-slate-100 text-slate-600 rounded-lg px-4 py-2">
                                                <span className="animate-pulse">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </>
                        ) : (
                            <CardContent className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-[#D1855C]/10 flex items-center justify-center mb-4">
                                        <Bot className="h-8 w-8 text-[#D1855C]" />
                                    </div>
                                    <p className="text-slate-600">
                                        Start a new conversation or select one from the sidebar
                                    </p>
                                    <Button
                                        className="mt-4 bg-[#D1855C] hover:bg-[#B1653C] text-white gap-2"
                                        onClick={() => createConversation()}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Start New Chat
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </Card>

                    {/* Input Area */}
                    <div className="mt-4 flex gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            className="flex-1 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                        <Button
                            className="bg-[#3D4A67] hover:bg-[#2D3A57] text-white"
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
