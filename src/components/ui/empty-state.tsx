/**
 * Empty State Component
 *
 * Displays friendly empty states with illustrations, messages, and call-to-action buttons
 */

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description?: string
    action?: {
        label: string
        onClick: () => void
    }
    secondaryAction?: {
        label: string
        onClick: () => void
    }
    className?: string
    compact?: boolean
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    secondaryAction,
    className,
    compact = false,
}: EmptyStateProps) {
    if (compact) {
        return (
            <div className={cn('text-center py-8', className)}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                    <Icon className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">{title}</h3>
                {description && <p className="text-sm text-slate-500 mb-4">{description}</p>}
                {action && (
                    <Button
                        size="sm"
                        onClick={action.onClick}
                        className="bg-[#3D4A67] hover:bg-[#2D3A57]"
                    >
                        {action.label}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <Card className={cn('border-slate-200', className)}>
            <CardContent className="py-12">
                <div className="text-center max-w-md mx-auto">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <Icon className="h-8 w-8 text-slate-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">{description}</p>
                    )}

                    {/* Actions */}
                    {(action || secondaryAction) && (
                        <div className="flex items-center justify-center gap-3">
                            {action && (
                                <Button
                                    onClick={action.onClick}
                                    className="bg-[#3D4A67] hover:bg-[#2D3A57] text-white"
                                >
                                    {action.label}
                                </Button>
                            )}
                            {secondaryAction && (
                                <Button
                                    variant="outline"
                                    onClick={secondaryAction.onClick}
                                    className="border-slate-300"
                                >
                                    {secondaryAction.label}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Pre-built empty states for common scenarios
 */

import {
    Users,
    Briefcase,
    CheckSquare,
    FileText,
    MessageSquare,
    Search,
    Filter,
    Inbox,
} from 'lucide-react'

export const EmptyStates = {
    NoContacts: ({ onCreate }: { onCreate: () => void }) => (
        <EmptyState
            icon={Users}
            title="No contacts yet"
            description="Start building your network by adding your first contact. Import from a file or create one manually."
            action={{ label: 'Add Contact', onClick: onCreate }}
        />
    ),

    NoProjects: ({ onCreate }: { onCreate: () => void }) => (
        <EmptyState
            icon={Briefcase}
            title="No projects yet"
            description="Projects help you organize your work. Create your first project to get started."
            action={{ label: 'Create Project', onClick: onCreate }}
        />
    ),

    NoTasks: ({ onCreate }: { onCreate: () => void }) => (
        <EmptyState
            icon={CheckSquare}
            title="No tasks yet"
            description="Stay organized by creating tasks for your projects and contacts."
            action={{ label: 'Add Task', onClick: onCreate }}
        />
    ),

    NoInvoices: ({ onCreate }: { onCreate: () => void }) => (
        <EmptyState
            icon={FileText}
            title="No invoices yet"
            description="Create professional invoices with QR-Bill support for Swiss payments."
            action={{ label: 'Create Invoice', onClick: onCreate }}
        />
    ),

    NoMessages: () => (
        <EmptyState
            icon={MessageSquare}
            title="No messages yet"
            description="Your conversations will appear here. Start a new chat to begin."
        />
    ),

    NoSearchResults: ({ query }: { query: string }) => (
        <EmptyState
            icon={Search}
            title="No results found"
            description={`We couldn't find anything matching "${query}". Try a different search term.`}
            compact
        />
    ),

    NoFilterResults: ({ onClearFilters }: { onClearFilters: () => void }) => (
        <EmptyState
            icon={Filter}
            title="No results match your filters"
            description="Try adjusting your filters to see more results."
            action={{ label: 'Clear Filters', onClick: onClearFilters }}
            compact
        />
    ),

    NoNotifications: () => (
        <EmptyState
            icon={Inbox}
            title="No notifications"
            description="You're all caught up! Notifications will appear here."
            compact
        />
    ),

    AllTasksCompleted: () => (
        <EmptyState
            icon={CheckSquare}
            title="All done!"
            description="You've completed all your tasks. Great work!"
            compact
        />
    ),
}
