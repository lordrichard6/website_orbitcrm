'use client'

import { useState, useEffect } from 'react'
import { useProjectStore } from '@/stores/project-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS, ProjectStatus } from '@/types/project'
import { FolderPlus, Trash2, Loader2 } from 'lucide-react'

export default function ProjectsPage() {
    const { projects, addProject, deleteProject, updateProject, fetchProjects, isLoading } = useProjectStore()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<ProjectStatus>('planning')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch projects on mount
    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || isSubmitting) return

        setIsSubmitting(true)
        await addProject({ name, description: description || undefined, status })
        setName('')
        setDescription('')
        setStatus('planning')
        setOpen(false)
        setIsSubmitting(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3D4A67]">Projects</h1>
                    <p className="text-slate-600">Track your client projects</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#9EAE8E] hover:bg-[#7E8E6E] text-white gap-2">
                            <FolderPlus className="h-4 w-4" />
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle className="text-[#3D4A67]">Create New Project</DialogTitle>
                                <DialogDescription>Add a new project to track.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Project Name *</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Website Redesign"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Project description..."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
                                <Button type="submit" className="bg-[#9EAE8E] hover:bg-[#7E8E6E]" disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating...</> : 'Create Project'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="py-12 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#3D4A67]" />
                        <span className="ml-2 text-slate-500">Loading projects...</span>
                    </CardContent>
                </Card>
            ) : projects.length === 0 ? (
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="py-12">
                        <p className="text-slate-500 text-center">
                            No projects yet. Create your first project to get started.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-[#3D4A67]">{project.name}</CardTitle>
                                    <Select
                                        value={project.status}
                                        onValueChange={(v) => updateProject(project.id, { status: v as ProjectStatus })}
                                    >
                                        <SelectTrigger className="w-28 h-7">
                                            <Badge className={PROJECT_STATUS_COLORS[project.status]}>
                                                {PROJECT_STATUS_LABELS[project.status]}
                                            </Badge>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {project.description && (
                                    <CardDescription className="text-slate-600">{project.description}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#D1855C] hover:text-[#B1653C] hover:bg-[#D1855C]/10 gap-2"
                                    onClick={() => deleteProject(project.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
