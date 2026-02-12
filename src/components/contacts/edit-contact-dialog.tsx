'use client'

import { useState } from 'react'
import { useContactStore } from '@/stores/contact-store'
import { Contact } from '@/types/contact'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

interface EditContactDialogProps {
    contact: Contact
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditContactDialog({ contact, open, onOpenChange }: EditContactDialogProps) {
    const { updateContact } = useContactStore()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        await updateContact(contact.id, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            company: formData.company || undefined,
        })

        setIsLoading(false)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-[#3D4A67]">Edit Contact</DialogTitle>
                    <DialogDescription className="text-slate-600">
                        Update contact information
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700">
                            Name *
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            required
                            className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                            Email *
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                            className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+41 79 123 4567"
                            className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company" className="text-slate-700">
                            Company
                        </Label>
                        <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Corp"
                            className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                            className="border-slate-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#3D4A67] hover:bg-[#2D3A57] text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
