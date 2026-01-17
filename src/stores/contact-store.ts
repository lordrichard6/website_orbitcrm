import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Contact, CreateContactInput, ContactStatus } from '@/types/contact'

interface ContactStore {
    contacts: Contact[]
    addContact: (input: CreateContactInput) => Contact
    updateContact: (id: string, updates: Partial<Contact>) => void
    deleteContact: (id: string) => void
    updateStatus: (id: string, status: ContactStatus) => void
    getContact: (id: string) => Contact | undefined
}

export const useContactStore = create<ContactStore>()(
    persist(
        (set, get) => ({
            contacts: [],

            addContact: (input) => {
                const newContact: Contact = {
                    id: crypto.randomUUID(),
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    company: input.company,
                    status: input.status || 'lead',
                    tags: input.tags || [],
                    notes: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                set((state) => ({ contacts: [...state.contacts, newContact] }))
                return newContact
            },

            updateContact: (id, updates) => {
                set((state) => ({
                    contacts: state.contacts.map((c) =>
                        c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
                    ),
                }))
            },

            deleteContact: (id) => {
                set((state) => ({
                    contacts: state.contacts.filter((c) => c.id !== id),
                }))
            },

            updateStatus: (id, status) => {
                set((state) => ({
                    contacts: state.contacts.map((c) =>
                        c.id === id ? { ...c, status, updatedAt: new Date() } : c
                    ),
                }))
            },

            getContact: (id) => {
                return get().contacts.find((c) => c.id === id)
            },
        }),
        {
            name: 'orbitcrm-contacts',
        }
    )
)
