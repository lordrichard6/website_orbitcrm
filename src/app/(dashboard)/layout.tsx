import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CheckSquare,
    MessageSquare,
    FileText,
    Settings,
    LogOut
} from 'lucide-react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-[#3D4A67] p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-white">OrbitCRM</h1>
                </div>
                <nav className="space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/contacts" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <Users className="h-5 w-5" />
                        Contacts
                    </Link>
                    <Link href="/projects" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <FolderKanban className="h-5 w-5" />
                        Projects
                    </Link>
                    <Link href="/tasks" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <CheckSquare className="h-5 w-5" />
                        Tasks
                    </Link>
                    <Link href="/chat" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <MessageSquare className="h-5 w-5" />
                        AI Chat
                    </Link>
                    <Link href="/documents" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                        Documents
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-white/80 hover:bg-white/10 hover:text-white">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-64 min-h-screen p-8">
                {children}
            </main>
        </div>
    )
}
