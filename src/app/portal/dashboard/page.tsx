'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingService } from '@/lib/services/calendar-sync';
import { createClient } from '@/lib/supabase/client';
import { Calendar, FileText, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PortalDashboard() {
    const [bookings, setBookings] = React.useState<any[]>([]);
    const [docs, setDocs] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const load = async () => {
            const _bookings = await BookingService.getMyBookings();
            setBookings(_bookings);

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: contact } = await supabase.from('contacts').select('id').eq('email', user.email).single();
                if (contact) {
                    const { data: _docs } = await supabase
                        .from('documents')
                        .select('*')
                        .eq('contact_id', contact.id)
                        .eq('visibility', 'shared')
                        .order('created_at', { ascending: false });
                    setDocs(_docs || []);
                }
            }
            setLoading(false);
        };
        load();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Good afternoon.</h1>
                    <p className="text-slate-500">Welcome to your Business OS.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BOOKINGS WIDGET */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                {bookings.map(b => (
                                    <div key={b.id} className="flex items-center">
                                        <div className="w-12 text-center text-sm font-bold text-slate-500">
                                            {new Date(b.start_time).getDate()} <br />
                                            {new Date(b.start_time).toLocaleString('default', { month: 'short' })}
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{b.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(b.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {b.location}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {!loading && bookings.length === 0 && <p className="text-sm text-slate-500">No upcoming appointments.</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* DOCUMENTS WIDGET */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Shared Documents</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                {docs.map(d => (
                                    <div key={d.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-full"><FileText className="h-4 w-4 text-blue-600" /></div>
                                            <span className="text-sm font-medium">{d.name}</span>
                                        </div>
                                        <Badge variant="outline">Download</Badge>
                                    </div>
                                ))}
                                {!loading && docs.length === 0 && <p className="text-sm text-slate-500">No documents shared with you yet.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
