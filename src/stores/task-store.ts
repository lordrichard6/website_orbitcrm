import { create } from 'zustand'
import { Task, CreateTaskInput, TaskStatus, TaskPriority } from '@/types/task'
import { createClient } from '@/lib/supabase/client'

interface TaskStore {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    
    // Actions
    fetchTasks: () => Promise<void>
    addTask: (input: CreateTaskInput) => Promise<Task | null>
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    updateStatus: (id: string, status: TaskStatus) => Promise<void>
    toggleSubtask: (taskId: string, subtaskId: string) => void
    getTask: (id: string) => Task | undefined
}

// Convert DB row to Task
function dbToTask(row: any): Task {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status || 'todo',
        priority: row.priority || 'medium',
        dueDate: row.due_date ? new Date(row.due_date) : undefined,
        projectId: row.project_id,
        contactId: row.contact_id,
        subtasks: [], // Subtasks not stored in DB yet
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true, error: null })
        try {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            const tasks = (data || []).map(dbToTask)
            set({ tasks, isLoading: false })
        } catch (error: any) {
            console.error('Error fetching tasks:', error)
            set({ error: error.message, isLoading: false })
        }
    },

    addTask: async (input) => {
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
                created_by: user.id,
                title: input.title,
                description: input.description || null,
                status: input.status || 'todo',
                priority: input.priority || 'medium',
                due_date: input.dueDate?.toISOString().split('T')[0] || null,
                project_id: input.projectId || null,
                contact_id: input.contactId || null,
            }

            const { data, error } = await supabase
                .from('tasks')
                .insert(dbData)
                .select()
                .single()

            if (error) throw error

            const newTask = dbToTask(data)
            set((state) => ({ tasks: [newTask, ...state.tasks] }))
            return newTask
        } catch (error: any) {
            console.error('Error adding task:', error)
            set({ error: error.message })
            return null
        }
    },

    updateTask: async (id, updates) => {
        set({ error: null })
        try {
            const supabase = createClient()
            
            const dbUpdates: any = { updated_at: new Date().toISOString() }
            
            if (updates.title !== undefined) dbUpdates.title = updates.title
            if (updates.description !== undefined) dbUpdates.description = updates.description
            if (updates.status !== undefined) dbUpdates.status = updates.status
            if (updates.priority !== undefined) dbUpdates.priority = updates.priority
            if (updates.dueDate !== undefined) {
                dbUpdates.due_date = updates.dueDate?.toISOString().split('T')[0] || null
            }
            if (updates.projectId !== undefined) dbUpdates.project_id = updates.projectId
            if (updates.contactId !== undefined) dbUpdates.contact_id = updates.contactId

            const { error } = await supabase
                .from('tasks')
                .update(dbUpdates)
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                tasks: state.tasks.map((t) =>
                    t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
                ),
            }))
        } catch (error: any) {
            console.error('Error updating task:', error)
            set({ error: error.message })
        }
    },

    deleteTask: async (id) => {
        set({ error: null })
        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id),
            }))
        } catch (error: any) {
            console.error('Error deleting task:', error)
            set({ error: error.message })
        }
    },

    updateStatus: async (id, status) => {
        await get().updateTask(id, { status })
    },

    // Subtasks are client-side only for now
    toggleSubtask: (taskId, subtaskId) => {
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === taskId
                    ? {
                        ...t,
                        subtasks: t.subtasks.map((s) =>
                            s.id === subtaskId ? { ...s, completed: !s.completed } : s
                        ),
                        updatedAt: new Date(),
                    }
                    : t
            ),
        }))
    },

    getTask: (id) => {
        return get().tasks.find((t) => t.id === id)
    },
}))
