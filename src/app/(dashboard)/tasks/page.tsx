'use client'

import { useState } from 'react'
import { useTaskStore } from '@/stores/task-store'
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
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS, TASK_PRIORITY_COLORS, TaskStatus, TaskPriority } from '@/types/task'
import { Plus, List, LayoutGrid, ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function TasksPage() {
    const { tasks, addTask, deleteTask, updateStatus } = useTaskStore()
    const [view, setView] = useState<'list' | 'kanban'>('kanban')
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState<TaskPriority>('medium')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title) return

        addTask({ title, priority })
        setTitle('')
        setPriority('medium')
        setOpen(false)
    }

    const tasksByStatus = {
        todo: tasks.filter(t => t.status === 'todo'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        done: tasks.filter(t => t.status === 'done'),
    }

    const columnColors = {
        todo: '#3D4A67',
        in_progress: '#E9B949',
        done: '#9EAE8E',
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3D4A67]">Tasks</h1>
                    <p className="text-slate-600">Manage your to-dos</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={view === 'list' ? 'default' : 'outline'}
                        className={view === 'list' ? 'bg-[#3D4A67]' : 'border-slate-300 text-slate-700'}
                        onClick={() => setView('list')}
                        size="sm"
                    >
                        <List className="h-4 w-4 mr-2" />
                        List
                    </Button>
                    <Button
                        variant={view === 'kanban' ? 'default' : 'outline'}
                        className={view === 'kanban' ? 'bg-[#3D4A67]' : 'border-slate-300 text-slate-700'}
                        onClick={() => setView('kanban')}
                        size="sm"
                    >
                        <LayoutGrid className="h-4 w-4 mr-2" />
                        Kanban
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#E9B949] hover:bg-[#C99929] text-[#1a1a1a] gap-2">
                                <Plus className="h-4 w-4" />
                                New Task
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle className="text-[#3D4A67]">Add New Task</DialogTitle>
                                    <DialogDescription>Create a task to track your work.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Task Title *</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Review proposal"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-[#E9B949] hover:bg-[#C99929] text-[#1a1a1a]">Add Task</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {tasks.length === 0 ? (
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="py-12">
                        <p className="text-slate-500 text-center">
                            No tasks yet. Create your first task to get started.
                        </p>
                    </CardContent>
                </Card>
            ) : view === 'kanban' ? (
                <div className="grid gap-4 md:grid-cols-3">
                    {Object.entries(TASK_STATUS_LABELS).map(([status, label]) => (
                        <Card key={status} className="border-slate-200 bg-slate-50">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: columnColors[status as TaskStatus] }} />
                                    <CardTitle className="text-lg text-slate-700">{label}</CardTitle>
                                </div>
                                <CardDescription>{tasksByStatus[status as TaskStatus].length} tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {tasksByStatus[status as TaskStatus].map((task) => (
                                    <Card key={task.id} className="bg-white border-slate-200 shadow-sm">
                                        <CardContent className="p-3">
                                            <div className="flex items-start justify-between">
                                                <p className="font-medium text-slate-900">{task.title}</p>
                                                <Badge className={TASK_PRIORITY_COLORS[task.priority]}>
                                                    {TASK_PRIORITY_LABELS[task.priority]}
                                                </Badge>
                                            </div>
                                            <div className="mt-2 flex gap-1">
                                                {status !== 'todo' && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-7 text-xs gap-1"
                                                        onClick={() => updateStatus(task.id, status === 'done' ? 'in_progress' : 'todo')}
                                                    >
                                                        <ChevronLeft className="h-3 w-3" />
                                                        Back
                                                    </Button>
                                                )}
                                                {status !== 'done' && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-7 text-xs gap-1"
                                                        onClick={() => updateStatus(task.id, status === 'todo' ? 'in_progress' : 'done')}
                                                    >
                                                        Next
                                                        <ChevronRight className="h-3 w-3" />
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-7 text-xs text-[#D1855C] hover:text-[#B1653C] hover:bg-[#D1855C]/10 ml-auto"
                                                    onClick={() => deleteTask(task.id)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="divide-y">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'done'}
                                        onChange={() => updateStatus(task.id, task.status === 'done' ? 'todo' : 'done')}
                                        className="h-4 w-4 accent-[#9EAE8E]"
                                    />
                                    <span className={task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'}>
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={TASK_PRIORITY_COLORS[task.priority]}>
                                        {TASK_PRIORITY_LABELS[task.priority]}
                                    </Badge>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-[#D1855C] hover:text-[#B1653C] hover:bg-[#D1855C]/10"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
