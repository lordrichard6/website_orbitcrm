'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyLookup } from './company-lookup';
import { createClient } from '@/lib/supabase/client';
import { type Contact } from '@/lib/types/schema';
import { Plus, Building2, User } from 'lucide-react';

export function ContactList() {
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    // Form State
    const [type, setType] = React.useState<'person' | 'company'>('person');
    const [formData, setFormData] = React.useState<Partial<Contact>>({});

    const supabase = createClient();

    const fetchContacts = React.useCallback(async () => {
        const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
        if (data) setContacts(data as any);
    }, [supabase]);

    React.useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const handleSave = async () => {
        try {
            const payload = {
                ...formData,
                is_company: type === 'company',
                tenant_id: (await supabase.auth.getUser()).data.user?.user_metadata?.tenant_id // This might be tricky if not set in metadata yet
                // Actually, RLS handles tenant_id usually if we infer it, BUT our schema defines it as NOT NULL.
                // We need a way to get the current tenant_id.
                // For Phase 2, let's assume we fetch it or it's inserted by trigger? 
                // Trigger approach: " BEFORE INSERT ... set new.tenant_id = (select tenant_id from profiles where id = auth.uid()) "
                // We didn't add that trigger yet. Let's rely on the API or add the trigger.
                // For now, let's assume the user has a profile with tenant_id.
            };

            // Temporary: We need to get tenant_id.
            const { data: profile } = await supabase.from('profiles').select('tenant_id').single();
            if (profile) {
                (payload as any).tenant_id = profile.tenant_id;
            }

            const { error } = await supabase.from('contacts').insert([payload]);
            if (error) throw error;

            setIsAddOpen(false);
            setFormData({});
            fetchContacts();

        } catch (e) {
            console.error("Error saving contact", e);
            alert("Failed to save contact");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Directory</h2>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Contact</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Contact</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="flex items-center gap-4">
                                <Button
                                    variant={type === 'person' ? 'default' : 'outline'}
                                    onClick={() => setType('person')}
                                    className="flex-1"
                                >
                                    <User className="mr-2 h-4 w-4" /> Person
                                </Button>
                                <Button
                                    variant={type === 'company' ? 'default' : 'outline'}
                                    onClick={() => setType('company')}
                                    className="flex-1"
                                >
                                    <Building2 className="mr-2 h-4 w-4" /> Organization
                                </Button>
                            </div>

                            {type === 'company' && (
                                <CompanyLookup onSelect={(company) => {
                                    setFormData({
                                        ...formData,
                                        company_name: company.name,
                                        company_uid: company.uidFormatted,
                                        address_line1: `${company.address.street || ''} ${company.address.houseNumber || ''}`.trim(),
                                        city: company.address.city,
                                        postal_code: company.address.postalCode,
                                        country: 'CH'
                                    });
                                }} />
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {type === 'person' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>First Name</Label>
                                            <Input value={formData.first_name || ''} onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last Name</Label>
                                            <Input value={formData.last_name || ''} onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
                                        </div>
                                    </>
                                )}
                                {type === 'company' && (
                                    <div className="col-span-2 space-y-2">
                                        <Label>Company Name</Label>
                                        <Input value={formData.company_name || ''} onChange={e => setFormData({ ...formData, company_name: e.target.value })} />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input placeholder="Street" value={formData.address_line1 || ''} onChange={e => setFormData({ ...formData, address_line1: e.target.value })} />
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <Input placeholder="Zip" className="col-span-1" value={formData.postal_code || ''} onChange={e => setFormData({ ...formData, postal_code: e.target.value })} />
                                    <Input placeholder="City" className="col-span-2" value={formData.city || ''} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                </div>
                            </div>

                            <Button onClick={handleSave}>Save Contact</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Tags</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>
                                        {contact.is_company ? <Building2 className="h-4 w-4 text-blue-500" /> : <User className="h-4 w-4 text-green-500" />}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {contact.is_company ? contact.company_name : `${contact.first_name} ${contact.last_name}`}
                                        {contact.company_uid && <span className="ml-2 text-xs text-slate-400 bg-slate-100 px-1 rounded">{contact.company_uid}</span>}
                                    </TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.city}</TableCell>
                                    <TableCell>{contact.tags?.join(', ')}</TableCell>
                                </TableRow>
                            ))}
                            {contacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">No contacts found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
