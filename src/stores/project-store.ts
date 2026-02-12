import { create } from 'zustand'
import { Project, CreateProjectInput, ProjectStatus } from '@/types/project'
import { createClient } from '@/lib/supabase/client'

interface ProjectStore {
    projects: Project[]
    isLoading: boolean
    error: string | null
    
    // Actions
    fetchProjects: () => Promise<void>
    addProject: (input: CreateProjectInput) => Promise<Project | null>
    updateProject: (id: string, updates: Partial<Project>) => Promise<void>
    deleteProject: (id: string) => Promise<void>
    getProject: (id: string) => Project | undefined
}

// Map DB status to frontend status (DB uses 'lead', frontend uses 'planning')
function mapDbStatus(dbStatus: string): ProjectStatus {
    if (dbStatus === 'lead') return 'planning'
    if (dbStatus === 'archived') return 'completed'
    return dbStatus as ProjectStatus
}

// Map frontend status to DB status
function mapToDbStatus(status: ProjectStatus): string {
    if (status === 'planning') return 'lead'
    return status
}

// Convert DB row to Project
function dbToProject(row: any): Project {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        clientId: row.contact_id,
        clientName: row.contacts?.company_name || 
            [row.contacts?.first_name, row.contacts?.last_name].filter(Boolean).join(' '),
        status: mapDbStatus(row.status),
        deadline: row.deadline ? new Date(row.deadline) : undefined,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }
}

export const useProjectStore = create<ProjectStore>()((set, get) => ({
    projects: [],
    isLoading: false,
    error: null,

    fetchProjects: async () => {
        set({ isLoading: true, error: null })
        try {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    contacts (
                        first_name,
                        last_name,
                        company_name
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            const projects = (data || []).map(dbToProject)
            set({ projects, isLoading: false })
        } catch (error: any) {
            console.error('Error fetching projects:', error)
            set({ error: error.message, isLoading: false })
        }
    },

    addProject: async (input) => {
        set({ error: null })
        try {
            const supabase = createClient()
            
            // Get current user's tenant_id
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')
            
            const { data: profile } = await supabase
                .from('profiles')
                .select('tenant_id')
                .eq('id', user.id)
                .single()
            
            if (!profile?.tenant_id) throw new Error('No organization found')

            const dbData = {
                tenant_id: profile.tenant_id,
                name: input.name,
                description: input.description || null,
                contact_id: input.clientId || null,
                status: mapToDbStatus(input.status || 'planning'),
                deadline: input.deadline?.toISOString() || null,
            }

            const { data, error } = await supabase
                .from('projects')
                .insert(dbData)
                .select(`
                    *,
                    contacts (
                        first_name,
                        last_name,
                        company_name
                    )
                `)
                .single()

            if (error) throw error

            const newProject = dbToProject(data)
            set((state) => ({ projects: [newProject, ...state.projects] }))
            return newProject
        } catch (error: any) {
            console.error('Error adding project:', error)
            set({ error: error.message })
            return null
        }
    },

    updateProject: async (id, updates) => {
        set({ error: null })
        try {
            const supabase = createClient()
            
            const dbUpdates: any = { updated_at: new Date().toISOString() }
            
            if (updates.name !== undefined) dbUpdates.name = updates.name
            if (updates.description !== undefined) dbUpdates.description = updates.description
            if (updates.clientId !== undefined) dbUpdates.contact_id = updates.clientId
            if (updates.status !== undefined) dbUpdates.status = mapToDbStatus(updates.status)
            if (updates.deadline !== undefined) {
                dbUpdates.deadline = updates.deadline?.toISOString() || null
            }

            const { error } = await supabase
                .from('projects')
                .update(dbUpdates)
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                projects: state.projects.map((p) =>
                    p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
                ),
            }))
        } catch (error: any) {
            console.error('Error updating project:', error)
            set({ error: error.message })
        }
    },

    deleteProject: async (id) => {
        set({ error: null })
        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                projects: state.projects.filter((p) => p.id !== id),
            }))
        } catch (error: any) {
            console.error('Error deleting project:', error)
            set({ error: error.message })
        }
    },

    getProject: (id) => {
        return get().projects.find((p) => p.id === id)
    },
}))
