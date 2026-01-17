'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactStore } from '@/stores/contact-store'
import { useProjectStore } from '@/stores/project-store'
import { useTaskStore } from '@/stores/task-store'
import { useChatStore } from '@/stores/chat-store'
import { Users, FolderKanban, CheckSquare, MessageSquare, UserPlus, FolderPlus, Bot, User, Folder, MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { SeedDataButton } from '@/components/seed-data-button'

export default function DashboardPage() {
    const contacts = useContactStore((state) => state.contacts)
    const projects = useProjectStore((state) => state.projects)
    const tasks = useTaskStore((state) => state.tasks)
    const conversations = useChatStore((state) => state.conversations)

    const pipeline = {
        lead: contacts.filter(c => c.status === 'lead').length,
        opportunity: contacts.filter(c => c.status === 'opportunity').length,
        client: contacts.filter(c => c.status === 'client').length,
        churned: contacts.filter(c => c.status === 'churned').length,
    }

    const openTasks = tasks.filter(t => t.status !== 'done').length

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3D4A67]">Dashboard</h1>
                    <p className="text-slate-600">Welcome back! Here&apos;s an overview of your CRM.</p>
                </div>
                <SeedDataButton />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                <Link href="/contacts">
                    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-[#3D4A67]/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-slate-600">Total Contacts</CardDescription>
                                <Users className="h-5 w-5 text-[#3D4A67]" />
                            </div>
                            <CardTitle className="text-3xl text-[#3D4A67]">{contacts.length}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/projects">
                    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-[#9EAE8E]/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-slate-600">Active Projects</CardDescription>
                                <FolderKanban className="h-5 w-5 text-[#9EAE8E]" />
                            </div>
                            <CardTitle className="text-3xl text-[#3D4A67]">
                                {projects.filter(p => p.status === 'active').length}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tasks">
                    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-[#E9B949]/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-slate-600">Open Tasks</CardDescription>
                                <CheckSquare className="h-5 w-5 text-[#E9B949]" />
                            </div>
                            <CardTitle className="text-3xl text-[#3D4A67]">{openTasks}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/chat">
                    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-[#D1855C]/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-slate-600">AI Conversations</CardDescription>
                                <MessageSquare className="h-5 w-5 text-[#D1855C]" />
                            </div>
                            <CardTitle className="text-3xl text-[#3D4A67]">{conversations.length}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-[#3D4A67]">Recent Activity</CardTitle>
                        <CardDescription className="text-slate-600">Your latest CRM activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {contacts.length === 0 && projects.length === 0 && tasks.length === 0 && conversations.length === 0 ? (
                            <p className="text-slate-500 text-center py-8">No recent activity</p>
                        ) : (
                            <div className="space-y-3">
                                {contacts.slice(-2).reverse().map(c => (
                                    <div key={c.id} className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-full bg-[#3D4A67]/10">
                                            <User className="h-3.5 w-3.5 text-[#3D4A67]" />
                                        </div>
                                        <span className="text-slate-700">Added contact: {c.name}</span>
                                    </div>
                                ))}
                                {projects.slice(-2).reverse().map(p => (
                                    <div key={p.id} className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-full bg-[#9EAE8E]/10">
                                            <Folder className="h-3.5 w-3.5 text-[#9EAE8E]" />
                                        </div>
                                        <span className="text-slate-700">Created project: {p.name}</span>
                                    </div>
                                ))}
                                {conversations.slice(-2).reverse().map(c => (
                                    <div key={c.id} className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-full bg-[#D1855C]/10">
                                            <MessagesSquare className="h-3.5 w-3.5 text-[#D1855C]" />
                                        </div>
                                        <span className="text-slate-700">Chat: {c.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-[#3D4A67]">Quick Actions</CardTitle>
                        <CardDescription className="text-slate-600">Common tasks at your fingertips</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/contacts">
                            <button className="w-full flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-left text-slate-700 hover:bg-[#3D4A67]/10 transition-colors">
                                <UserPlus className="h-5 w-5 text-[#3D4A67]" />
                                Add New Contact
                            </button>
                        </Link>
                        <Link href="/projects">
                            <button className="w-full flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-left text-slate-700 hover:bg-[#9EAE8E]/10 transition-colors">
                                <FolderPlus className="h-5 w-5 text-[#9EAE8E]" />
                                Create Project
                            </button>
                        </Link>
                        <Link href="/chat">
                            <button className="w-full flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-left text-slate-700 hover:bg-[#D1855C]/10 transition-colors">
                                <Bot className="h-5 w-5 text-[#D1855C]" />
                                Start AI Chat
                            </button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Pipeline Overview */}
            <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-[#3D4A67]">Sales Pipeline</CardTitle>
                    <CardDescription className="text-slate-600">Contacts by stage</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[#3D4A67]">{pipeline.lead}</p>
                            <p className="text-sm text-slate-600">Leads</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[#E9B949]">{pipeline.opportunity}</p>
                            <p className="text-sm text-slate-600">Opportunities</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[#9EAE8E]">{pipeline.client}</p>
                            <p className="text-sm text-slate-600">Clients</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-[#D1855C]">{pipeline.churned}</p>
                            <p className="text-sm text-slate-600">Churned</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
