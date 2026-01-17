// Mock data seed for OrbitCRM demo

import { Contact } from '@/types/contact'
import { Project } from '@/types/project'
import { Task } from '@/types/task'
import { Conversation, Message } from '@/types/chat'

export const mockContacts: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1 415 555 0101',
        company: 'TechCorp Inc',
        status: 'client',
        tags: ['enterprise', 'tech'],
        notes: [],
    },
    {
        name: 'Michael Chen',
        email: 'mchen@startuphub.io',
        phone: '+1 628 555 0202',
        company: 'StartupHub',
        status: 'opportunity',
        tags: ['startup', 'saas'],
        notes: [],
    },
    {
        name: 'Emma Williams',
        email: 'emma.w@designstudio.co',
        phone: '+1 510 555 0303',
        company: 'Design Studio Co',
        status: 'lead',
        tags: ['design', 'agency'],
        notes: [],
    },
    {
        name: 'James Rodriguez',
        email: 'james@globalventures.com',
        phone: '+1 925 555 0404',
        company: 'Global Ventures',
        status: 'client',
        tags: ['finance', 'investment'],
        notes: [],
    },
    {
        name: 'Lisa Park',
        email: 'lpark@innovatelabs.dev',
        phone: '+1 408 555 0505',
        company: 'Innovate Labs',
        status: 'opportunity',
        tags: ['tech', 'ai'],
        notes: [],
    },
    {
        name: 'David Kim',
        email: 'david.kim@retailplus.com',
        phone: '+1 650 555 0606',
        company: 'RetailPlus',
        status: 'lead',
        tags: ['retail', 'ecommerce'],
        notes: [],
    },
    {
        name: 'Anna Martinez',
        email: 'anna@greentech.eco',
        phone: '+1 831 555 0707',
        company: 'GreenTech Solutions',
        status: 'churned',
        tags: ['sustainability', 'tech'],
        notes: [],
    },
    {
        name: 'Robert Thompson',
        email: 'rthompson@lawfirm.legal',
        phone: '+1 415 555 0808',
        company: 'Thompson & Associates',
        status: 'client',
        tags: ['legal', 'professional'],
        notes: [],
    },
]

export const mockProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        name: 'TechCorp Website Redesign',
        description: 'Complete overhaul of corporate website with new brand identity',
        clientName: 'TechCorp Inc',
        status: 'active',
    },
    {
        name: 'StartupHub Mobile App',
        description: 'iOS and Android app for community engagement',
        clientName: 'StartupHub',
        status: 'planning',
    },
    {
        name: 'Global Ventures CRM Integration',
        description: 'Custom CRM integration with existing systems',
        clientName: 'Global Ventures',
        status: 'active',
    },
    {
        name: 'RetailPlus E-commerce Platform',
        description: 'New e-commerce platform with AI recommendations',
        clientName: 'RetailPlus',
        status: 'planning',
    },
    {
        name: 'Design Studio Brand Guidelines',
        description: 'Creating comprehensive brand guidelines document',
        clientName: 'Design Studio Co',
        status: 'completed',
    },
]

export const mockTasks: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        title: 'Review TechCorp wireframes',
        description: 'Review and approve wireframes for homepage redesign',
        status: 'done',
        priority: 'high',
        subtasks: [],
    },
    {
        title: 'Prepare proposal for StartupHub',
        description: 'Draft mobile app development proposal with timeline',
        status: 'in_progress',
        priority: 'high',
        subtasks: [],
    },
    {
        title: 'Schedule meeting with Global Ventures',
        description: 'Quarterly review meeting to discuss project progress',
        status: 'todo',
        priority: 'medium',
        subtasks: [],
    },
    {
        title: 'Send invoice to TechCorp',
        description: 'Monthly invoice for website development work',
        status: 'todo',
        priority: 'urgent',
        subtasks: [],
    },
    {
        title: 'Update RetailPlus requirements doc',
        description: 'Incorporate feedback from stakeholder meeting',
        status: 'in_progress',
        priority: 'medium',
        subtasks: [],
    },
    {
        title: 'Research AI recommendation engines',
        description: 'Evaluate options for RetailPlus platform',
        status: 'todo',
        priority: 'low',
        subtasks: [],
    },
    {
        title: 'Follow up with Lisa Park',
        description: 'Discuss partnership opportunity with Innovate Labs',
        status: 'todo',
        priority: 'medium',
        subtasks: [],
    },
    {
        title: 'Review brand guidelines deliverable',
        description: 'Final review before sending to Design Studio',
        status: 'done',
        priority: 'high',
        subtasks: [],
    },
]

export const mockConversations: { title: string; messages: Omit<Message, 'id' | 'createdAt'>[] }[] = [
    {
        title: 'Help me draft an email to Sarah...',
        messages: [
            { role: 'user', content: 'Help me draft an email to Sarah Johnson about the website redesign progress' },
            { role: 'assistant', content: 'I\'d be happy to help you draft that email! Here\'s a professional update:\n\nSubject: TechCorp Website Redesign - Progress Update\n\nDear Sarah,\n\nI wanted to provide you with a quick update on the website redesign project. We\'ve made excellent progress this week:\n\n• Homepage wireframes are now approved\n• Development of the new navigation is 80% complete\n• Mobile responsive layouts are in testing\n\nWe\'re on track for the milestone delivery next Friday. Would you like to schedule a demo call to review the progress?\n\nBest regards' },
        ],
    },
    {
        title: 'What tasks are due this week?',
        messages: [
            { role: 'user', content: 'What tasks are due this week?' },
            { role: 'assistant', content: 'Based on your current task list, here are your priorities for this week:\n\n🔴 Urgent:\n• Send invoice to TechCorp (overdue)\n\n🟡 High Priority:\n• Prepare proposal for StartupHub (in progress)\n\n🟢 Medium Priority:\n• Schedule meeting with Global Ventures\n• Follow up with Lisa Park\n• Update RetailPlus requirements doc (in progress)\n\nWould you like me to help you with any of these tasks?' },
        ],
    },
]

export function seedMockData() {
    // This function should be called from client components
    // It returns the data to be added via store functions
    return {
        contacts: mockContacts,
        projects: mockProjects,
        tasks: mockTasks,
        conversations: mockConversations,
    }
}
