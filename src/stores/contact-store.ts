import { create } from 'zustand'
import { Contact, CreateContactInput, ContactStatus } from '@/types/contact'
import { createClient } from '@/lib/supabase/client'

interface ContactStore {
    contacts: Contact[]
    isLoading: boolean
    error: string | null
    
    // Actions
    fetchContacts: () => Promise<void>
    addContact: (input: CreateContactInput) => Promise<Contact | null>
    updateContact: (id: string, updates: Partial<Contact>) => Promise<void>
    deleteContact: (id: string) => Promise<void>
    updateStatus: (id: string, status: ContactStatus) => Promise<void>
    getContact: (id: string) => Contact | undefined
}

// Helper to convert DB row to Contact type
function dbToContact(row: any): Contact {
    const name = row.is_company 
        ? row.company_name 
        : [row.first_name, row.last_name].filter(Boolean).join(' ')
    
    return {
        id: row.id,
        name: name || row.email || 'Unknown',
        email: row.email || '',
        phone: row.phone,
        company: row.is_company ? undefined : row.company_name,
        status: row.status || 'lead',
        tags: row.tags || [],
        notes: row.notes ? [row.notes] : [],
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }
}

// Helper to convert Contact to DB format
function contactToDb(input: CreateContactInput) {
    // Parse name into first/last (simple split)
    const nameParts = input.name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    
    return {
        first_name: firstName,
        last_name: lastName,
        email: input.email,
        phone: input.phone || null,
        company_name: input.company || null,
        is_company: false,
        status: input.status || 'lead',
        tags: input.tags || [],
        notes: null,
    }
}

export const useContactStore = create<ContactStore>()((set, get) => ({
    contacts: [],
    isLoading: false,
    error: null,

    fetchContacts: async () => {
        set({ isLoading: true, error: null })
        try {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            const contacts = (data || []).map(dbToContact)
            set({ contacts, isLoading: false })
        } catch (error: any) {
            console.error('Error fetching contacts:', error)
            set({ error: error.message, isLoading: false })
        }
    },

    addContact: async (input) => {
        set({ error: null })
        try {
            const supabase = createClient()
            
            // Get current user's tenant_id
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')
            
            const { data: profile } = await supabase
                .from('profiles')
                .select('tenant_id')
                .eq('id', user.id)
                .single()
            
            if (!profile?.tenant_id) throw new Error('No organization found')
            
            const dbData = {
                ...contactToDb(input),
                tenant_id: profile.tenant_id,
            }

            const { data, error } = await supabase
                .from('contacts')
                .insert(dbData)
                .select()
                .single()

            if (error) throw error

            const newContact = dbToContact(data)
            set((state) => ({ contacts: [newContact, ...state.contacts] }))
            return newContact
        } catch (error: any) {
            console.error('Error adding contact:', error)
            set({ error: error.message })
            return null
        }
    },

    updateContact: async (id, updates) => {
        set({ error: null })
        try {
            const supabase = createClient()
            
            // Build update object
            const dbUpdates: any = { updated_at: new Date().toISOString() }
            
            if (updates.name) {
                const nameParts = updates.name.trim().split(' ')
                dbUpdates.first_name = nameParts[0] || ''
                dbUpdates.last_name = nameParts.slice(1).join(' ') || ''
            }
            if (updates.email !== undefined) dbUpdates.email = updates.email
            if (updates.phone !== undefined) dbUpdates.phone = updates.phone
            if (updates.company !== undefined) dbUpdates.company_name = updates.company
            if (updates.status !== undefined) dbUpdates.status = updates.status
            if (updates.tags !== undefined) dbUpdates.tags = updates.tags
            if (updates.notes !== undefined) dbUpdates.notes = updates.notes.join('\n')

            const { error } = await supabase
                .from('contacts')
                .update(dbUpdates)
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                contacts: state.contacts.map((c) =>
                    c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
                ),
            }))
        } catch (error: any) {
            console.error('Error updating contact:', error)
            set({ error: error.message })
        }
    },

    deleteContact: async (id) => {
        set({ error: null })
        try {
            const supabase = createClient()
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id)

            if (error) throw error

            set((state) => ({
                contacts: state.contacts.filter((c) => c.id !== id),
            }))
        } catch (error: any) {
            console.error('Error deleting contact:', error)
            set({ error: error.message })
        }
    },

    updateStatus: async (id, status) => {
        await get().updateContact(id, { status })
    },

    getContact: (id) => {
        return get().contacts.find((c) => c.id === id)
    },
}))
