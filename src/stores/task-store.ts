import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, CreateTaskInput, TaskStatus, TaskPriority } from '@/types/task'

interface TaskStore {
    tasks: Task[]
    addTask: (input: CreateTaskInput) => Task
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    updateStatus: (id: string, status: TaskStatus) => void
    toggleSubtask: (taskId: string, subtaskId: string) => void
    getTask: (id: string) => Task | undefined
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: [],

            addTask: (input) => {
                const newTask: Task = {
                    id: crypto.randomUUID(),
                    title: input.title,
                    description: input.description,
                    status: input.status || 'todo',
                    priority: input.priority || 'medium',
                    dueDate: input.dueDate,
                    projectId: input.projectId,
                    contactId: input.contactId,
                    subtasks: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                set((state) => ({ tasks: [...state.tasks, newTask] }))
                return newTask
            },

            updateTask: (id, updates) => {
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
                    ),
                }))
            },

            deleteTask: (id) => {
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                }))
            },

            updateStatus: (id, status) => {
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, status, updatedAt: new Date() } : t
                    ),
                }))
            },

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
        }),
        {
            name: 'orbitcrm-tasks',
        }
    )
)
