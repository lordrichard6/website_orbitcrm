'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, Building2, CreditCard, Receipt } from 'lucide-react'
import { getSupportedCountries, TAX_RATES } from '@/lib/invoices/tax-rates'

interface BillingSettings {
    company_name: string
    address: string
    zip: string
    city: string
    country: string
    iban: string
    bic: string
    bank_name: string
    vat_number: string
    email: string
    phone: string
    default_currency: string
    default_tax_rate: number
    invoice_prefix: string
}

const DEFAULT_BILLING: BillingSettings = {
    company_name: '',
    address: '',
    zip: '',
    city: '',
    country: 'CH',
    iban: '',
    bic: '',
    bank_name: '',
    vat_number: '',
    email: '',
    phone: '',
    default_currency: 'CHF',
    default_tax_rate: 8.1,
    invoice_prefix: 'INV',
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [orgId, setOrgId] = useState<string | null>(null)
    const [orgName, setOrgName] = useState('')
    const [billing, setBilling] = useState<BillingSettings>(DEFAULT_BILLING)
    const [profileName, setProfileName] = useState('')
    const [profileEmail, setProfileEmail] = useState('')
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const supabase = createClient()
    const countries = getSupportedCountries()

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        setLoading(true)
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Get profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, email, tenant_id')
                .eq('id', user.id)
                .single()

            if (profile) {
                setProfileName(profile.full_name || '')
                setProfileEmail(profile.email || user.email || '')
                
                if (profile.tenant_id) {
                    setOrgId(profile.tenant_id)
                    
                    // Get organization settings
                    const { data: org } = await supabase
                        .from('organizations')
                        .select('name, settings')
                        .eq('id', profile.tenant_id)
                        .single()

                    if (org) {
                        setOrgName(org.name || '')
                        const settings = (org.settings as Record<string, unknown>) || {}
                        const billingSettings = (settings.billing as BillingSettings) || {}
                        setBilling({
                            ...DEFAULT_BILLING,
                            ...billingSettings,
                        })
                    }
                }
            }
        } catch (error) {
            console.error('Error loading settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveBilling = async () => {
        if (!orgId) return
        setSaving(true)
        setMessage(null)

        try {
            // Get current settings
            const { data: org } = await supabase
                .from('organizations')
                .select('settings')
                .eq('id', orgId)
                .single()

            const currentSettings = (org?.settings as Record<string, unknown>) || {}

            // Merge billing settings
            const updatedSettings = {
                ...currentSettings,
                billing: billing,
            }

            // Update organization
            const { error } = await supabase
                .from('organizations')
                .update({
                    name: orgName,
                    settings: updatedSettings,
                })
                .eq('id', orgId)

            if (error) throw error

            setMessage({ type: 'success', text: 'Settings saved successfully!' })
        } catch (error: any) {
            console.error('Error saving settings:', error)
            setMessage({ type: 'error', text: error.message || 'Failed to save settings' })
        } finally {
            setSaving(false)
        }
    }

    const updateBilling = (field: keyof BillingSettings, value: string | number) => {
        setBilling(prev => ({ ...prev, [field]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#3D4A67]" />
                <span className="ml-2 text-slate-500">Loading settings...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[#3D4A67]">Settings</h1>
                <p className="text-slate-600">Manage your account and organization</p>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-6">
                {/* Profile Section */}
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-[#3D4A67]">Profile</CardTitle>
                        <CardDescription className="text-slate-600">Your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={profileName}
                                    onChange={e => setProfileName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    value={profileEmail}
                                    disabled
                                    className="bg-slate-100 text-slate-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Organization Section */}
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3">
                        <Building2 className="h-5 w-5 text-[#3D4A67]" />
                        <div>
                            <CardTitle className="text-[#3D4A67]">Organization</CardTitle>
                            <CardDescription className="text-slate-600">Your company details for invoices</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Company Name</Label>
                                <Input
                                    value={billing.company_name}
                                    onChange={e => updateBilling('company_name', e.target.value)}
                                    placeholder="Your Company GmbH"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>VAT Number</Label>
                                <Input
                                    value={billing.vat_number}
                                    onChange={e => updateBilling('vat_number', e.target.value)}
                                    placeholder="CHE-123.456.789 MWST"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input
                                value={billing.address}
                                onChange={e => updateBilling('address', e.target.value)}
                                placeholder="Street and number"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>ZIP/Postal Code</Label>
                                <Input
                                    value={billing.zip}
                                    onChange={e => updateBilling('zip', e.target.value)}
                                    placeholder="8000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input
                                    value={billing.city}
                                    onChange={e => updateBilling('city', e.target.value)}
                                    placeholder="Zurich"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Select value={billing.country} onValueChange={v => updateBilling('country', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map(code => (
                                            <SelectItem key={code} value={code}>
                                                {TAX_RATES[code]?.name || code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={billing.email}
                                    onChange={e => updateBilling('email', e.target.value)}
                                    placeholder="invoices@company.ch"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    value={billing.phone}
                                    onChange={e => updateBilling('phone', e.target.value)}
                                    placeholder="+41 44 123 45 67"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bank Details Section */}
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3">
                        <CreditCard className="h-5 w-5 text-[#3D4A67]" />
                        <div>
                            <CardTitle className="text-[#3D4A67]">Bank Details</CardTitle>
                            <CardDescription className="text-slate-600">Payment information for invoices and QR-Bills</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>IBAN</Label>
                            <Input
                                value={billing.iban}
                                onChange={e => updateBilling('iban', e.target.value)}
                                placeholder="CH93 0076 2011 6238 5295 7"
                                className="font-mono"
                            />
                            <p className="text-xs text-slate-500">
                                This IBAN will be used for Swiss QR-Bills and EU SEPA invoices
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>BIC/SWIFT (optional)</Label>
                                <Input
                                    value={billing.bic}
                                    onChange={e => updateBilling('bic', e.target.value)}
                                    placeholder="ZKBKCHZZ80A"
                                    className="font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bank Name (optional)</Label>
                                <Input
                                    value={billing.bank_name}
                                    onChange={e => updateBilling('bank_name', e.target.value)}
                                    placeholder="Zürcher Kantonalbank"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Invoice Preferences Section */}
                <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3">
                        <Receipt className="h-5 w-5 text-[#3D4A67]" />
                        <div>
                            <CardTitle className="text-[#3D4A67]">Invoice Preferences</CardTitle>
                            <CardDescription className="text-slate-600">Default settings for new invoices</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Invoice Number Prefix</Label>
                                <Input
                                    value={billing.invoice_prefix}
                                    onChange={e => updateBilling('invoice_prefix', e.target.value)}
                                    placeholder="INV"
                                    maxLength={10}
                                />
                                <p className="text-xs text-slate-500">
                                    e.g., INV-2026-0001
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Default Currency</Label>
                                <Select 
                                    value={billing.default_currency} 
                                    onValueChange={v => updateBilling('default_currency', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Default Tax Rate</Label>
                                <Select 
                                    value={billing.default_tax_rate.toString()} 
                                    onValueChange={v => updateBilling('default_tax_rate', parseFloat(v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0% (Exempt)</SelectItem>
                                        <SelectItem value="2.6">2.6% (CH Reduced)</SelectItem>
                                        <SelectItem value="8.1">8.1% (CH Standard)</SelectItem>
                                        <SelectItem value="7">7% (DE Reduced)</SelectItem>
                                        <SelectItem value="19">19% (DE Standard)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button 
                        onClick={handleSaveBilling}
                        disabled={saving}
                        className="bg-[#3D4A67] hover:bg-[#2D3A57]"
                    >
                        {saving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    )
}
