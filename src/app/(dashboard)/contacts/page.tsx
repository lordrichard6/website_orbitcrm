'use client'

import { useContactStore } from '@/stores/contact-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AddContactDialog } from '@/components/contacts/add-contact-dialog'
import { STATUS_LABELS, STATUS_COLORS, ContactStatus } from '@/types/contact'
import { useState } from 'react'
import { Search, Filter, Trash2 } from 'lucide-react'

export default function ContactsPage() {
    const { contacts, deleteContact, updateStatus } = useContactStore()
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            (contact.company?.toLowerCase().includes(search.toLowerCase()) ?? false)
        const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#3D4A67]">Contacts</h1>
                    <p className="text-slate-600">Manage your customer relationships</p>
                </div>
                <AddContactDialog />
            </div>

            <div className="flex gap-4">
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Search contacts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 border-slate-300">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-[#3D4A67]">All Contacts</CardTitle>
                    <CardDescription className="text-slate-600">
                        {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} total
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredContacts.length === 0 ? (
                        <p className="text-slate-500 text-center py-12">
                            {contacts.length === 0
                                ? "No contacts yet. Add your first contact to get started."
                                : "No contacts match your search."
                            }
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredContacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.company || '-'}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={contact.status}
                                                onValueChange={(v) => updateStatus(contact.id, v as ContactStatus)}
                                            >
                                                <SelectTrigger className="w-32 h-8">
                                                    <Badge className={STATUS_COLORS[contact.status]}>
                                                        {STATUS_LABELS[contact.status]}
                                                    </Badge>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-[#D1855C] hover:text-[#B1653C] hover:bg-[#D1855C]/10"
                                                onClick={() => deleteContact(contact.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
