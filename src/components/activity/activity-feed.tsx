'use client'

import { useEffect, useState } from 'react'
import { getOrganizationActivity } from '@/lib/activity-log'
import { formatRelativeTime } from '@/lib/format-time'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Clock,
    Plus,
    Edit,
    Trash2,
    Mail,
    Phone,
    FileText,
    Tag,
    CheckCircle,
    DollarSign,
    Download,
    Upload,
    Eye,
    TrendingUp,
    User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityFeedProps {
    title?: string
    limit?: number
    showAvatar?: boolean
}

// Map event types to icons
const eventIcons: Record<string, React.ReactNode> = {
    created: <Plus className="h-3.5 w-3.5" />,
    updated: <Edit className="h-3.5 w-3.5" />,
    deleted: <Trash2 className="h-3.5 w-3.5" />,
    viewed: <Eye className="h-3.5 w-3.5" />,
    emailed: <Mail className="h-3.5 w-3.5" />,
    called: <Phone className="h-3.5 w-3.5" />,
    noted: <FileText className="h-3.5 w-3.5" />,
    tagged: <Tag className="h-3.5 w-3.5" />,
    status_changed: <TrendingUp className="h-3.5 w-3.5" />,
    assigned: <Plus className="h-3.5 w-3.5" />,
    completed: <CheckCircle className="h-3.5 w-3.5" />,
    invoiced: <DollarSign className="h-3.5 w-3.5" />,
    paid: <DollarSign className="h-3.5 w-3.5" />,
    uploaded: <Upload className="h-3.5 w-3.5" />,
    downloaded: <Download className="h-3.5 w-3.5" />,
}

// Map event types to colors
const eventColors: Record<string, string> = {
    created: 'bg-green-100 text-green-700',
    updated: 'bg-blue-100 text-blue-700',
    deleted: 'bg-red-100 text-red-700',
    viewed: 'bg-gray-100 text-gray-700',
    emailed: 'bg-purple-100 text-purple-700',
    called: 'bg-indigo-100 text-indigo-700',
    noted: 'bg-yellow-100 text-yellow-700',
    tagged: 'bg-pink-100 text-pink-700',
    status_changed: 'bg-orange-100 text-orange-700',
    assigned: 'bg-cyan-100 text-cyan-700',
    completed: 'bg-green-100 text-green-700',
    invoiced: 'bg-emerald-100 text-emerald-700',
    paid: 'bg-green-100 text-green-700',
    uploaded: 'bg-blue-100 text-blue-700',
    downloaded: 'bg-blue-100 text-blue-700',
}

export function ActivityFeed({
    title = 'Recent Activity',
    limit = 20,
    showAvatar = true,
}: ActivityFeedProps) {
    const [activities, setActivities] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchActivities() {
            setIsLoading(true)
            const data = await getOrganizationActivity(limit)
            setActivities(data)
            setIsLoading(false)
        }

        fetchActivities()
    }, [limit])

    if (isLoading) {
        return (
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="text-[#3D4A67]">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="h-4 w-4 animate-spin" />
                        <span>Loading activity...</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (activities.length === 0) {
        return (
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="text-[#3D4A67]">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-slate-500">
                        <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>No recent activity</p>
                        <p className="text-sm mt-1">Activity will appear here as you work</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-[#3D4A67]">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {activities.map((activity) => {
                        const icon = eventIcons[activity.event_type] || <Clock className="h-3.5 w-3.5" />
                        const colorClass =
                            eventColors[activity.event_type] || 'bg-gray-100 text-gray-700'

                        return (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                {/* Avatar or Icon */}
                                {showAvatar && activity.user_avatar ? (
                                    <img
                                        src={activity.user_avatar}
                                        alt={activity.user_name}
                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                    />
                                ) : showAvatar ? (
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                        <User className="h-4 w-4 text-slate-500" />
                                    </div>
                                ) : (
                                    <div
                                        className={cn(
                                            'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                                            colorClass
                                        )}
                                    >
                                        {icon}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-900">
                                        {showAvatar && activity.user_name && (
                                            <span className="font-medium">{activity.user_name} </span>
                                        )}
                                        <span className="text-slate-600">
                                            {activity.description || activity.event_type}
                                        </span>
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">
                                            {formatRelativeTime(activity.created_at)}
                                        </span>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-500 capitalize">
                                            {activity.entity_type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
