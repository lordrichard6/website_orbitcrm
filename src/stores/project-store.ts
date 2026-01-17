import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, CreateProjectInput, ProjectStatus } from '@/types/project'

interface ProjectStore {
    projects: Project[]
    addProject: (input: CreateProjectInput) => Project
    updateProject: (id: string, updates: Partial<Project>) => void
    deleteProject: (id: string) => void
    getProject: (id: string) => Project | undefined
}

export const useProjectStore = create<ProjectStore>()(
    persist(
        (set, get) => ({
            projects: [],

            addProject: (input) => {
                const newProject: Project = {
                    id: crypto.randomUUID(),
                    name: input.name,
                    description: input.description,
                    clientId: input.clientId,
                    status: input.status || 'planning',
                    deadline: input.deadline,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                set((state) => ({ projects: [...state.projects, newProject] }))
                return newProject
            },

            updateProject: (id, updates) => {
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
                    ),
                }))
            },

            deleteProject: (id) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                }))
            },

            getProject: (id) => {
                return get().projects.find((p) => p.id === id)
            },
        }),
        {
            name: 'orbitcrm-projects',
        }
    )
)
