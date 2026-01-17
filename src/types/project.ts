// Project types for OrbitCRM

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed'

export interface Project {
    id: string
    name: string
    description?: string
    clientId?: string
    clientName?: string
    status: ProjectStatus
    deadline?: Date
    createdAt: Date
    updatedAt: Date
}

export interface CreateProjectInput {
    name: string
    description?: string
    clientId?: string
    status?: ProjectStatus
    deadline?: Date
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
    planning: 'Planning',
    active: 'Active',
    on_hold: 'On Hold',
    completed: 'Completed',
}

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
    planning: 'bg-purple-100 text-purple-700',
    active: 'bg-green-100 text-green-700',
    on_hold: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
}
