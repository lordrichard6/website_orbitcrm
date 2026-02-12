'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, Home, FileText } from 'lucide-react';

export function PortalHeader() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-6">
                    <Link href="/portal/dashboard" className="flex items-center gap-2 font-bold text-xl text-[#3D4A67]">
                        Orbit<span className="text-blue-600">Portal</span>
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <Link href="/portal/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                            <Home className="h-4 w-4" /> Dashboard
                        </Link>
                        {/* Future Links */}
                    </nav>
                </div>
                <div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    );
}
