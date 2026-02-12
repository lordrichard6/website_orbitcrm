'use client'

import { useEffect, useState } from 'react'
import { getEntityActivity, EntityType } from '@/lib/activity-log'
import { formatRelativeTime, formatAbsoluteTime } from '@/lib/format-time'
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
} from 'lucide-react'

interface ActivityTimelineProps {
    entityType: EntityType
    entityId: string
    title?: string
    limit?: number
    compact?: boolean
}

// Map event types to icons
const eventIcons: Record<string, React.ReactNode> = {
    created: <Plus className="h-4 w-4" />,
    updated: <Edit className="h-4 w-4" />,
    deleted: <Trash2 className="h-4 w-4" />,
    viewed: <Eye className="h-4 w-4" />,
    emailed: <Mail className="h-4 w-4" />,
    called: <Phone className="h-4 w-4" />,
    noted: <FileText className="h-4 w-4" />,
    tagged: <Tag className="h-4 w-4" />,
    status_changed: <TrendingUp className="h-4 w-4" />,
    assigned: <Plus className="h-4 w-4" />,
    completed: <CheckCircle className="h-4 w-4" />,
    invoiced: <DollarSign className="h-4 w-4" />,
    paid: <DollarSign className="h-4 w-4" />,
    uploaded: <Upload className="h-4 w-4" />,
    downloaded: <Download className="h-4 w-4" />,
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

export function ActivityTimeline({
    entityType,
    entityId,
    title = 'Activity Timeline',
    limit = 50,
    compact = false,
}: ActivityTimelineProps) {
    const [activities, setActivities] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAbsolute, setShowAbsolute] = useState(false)

    useEffect(() => {
        async function fetchActivities() {
            setIsLoading(true)
            const data = await getEntityActivity(entityType, entityId, limit)
            setActivities(data)
            setIsLoading(false)
        }

        fetchActivities()
    }, [entityType, entityId, limit])

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
                        <p>No activity yet</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#3D4A67]">{title}</CardTitle>
                <button
                    onClick={() => setShowAbsolute(!showAbsolute)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                >
                    {showAbsolute ? 'Show relative' : 'Show absolute'}
                </button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => {
                        const icon = eventIcons[activity.event_type] || <Clock className="h-4 w-4" />
                        const colorClass =
                            eventColors[activity.event_type] || 'bg-gray-100 text-gray-700'

                        return (
                            <div key={activity.id} className="relative flex gap-3">
                                {/* Timeline line */}
                                {index < activities.length - 1 && (
                                    <div
                                        className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-200"
                                        style={{ height: 'calc(100% + 1rem)' }}
                                    />
                                )}

                                {/* Icon */}
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClass} relative z-10`}
                                >
                                    {icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-0.5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">
                                                {activity.description || activity.event_type}
                                            </p>
                                            {!compact && activity.user_name && (
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    by {activity.user_name}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-500 flex-shrink-0">
                                            {showAbsolute
                                                ? formatAbsoluteTime(activity.created_at)
                                                : formatRelativeTime(activity.created_at)}
                                        </span>
                                    </div>

                                    {/* Metadata display */}
                                    {!compact && activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                        <div className="mt-2 p-2 bg-slate-50 rounded text-xs text-slate-600">
                                            {Object.entries(activity.metadata).map(([key, value]) => (
                                                <div key={key}>
                                                    <span className="font-medium">{key}:</span>{' '}
                                                    {String(value)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
