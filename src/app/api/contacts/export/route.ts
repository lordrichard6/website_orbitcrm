import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('org_id')
      .eq('id', user.id)
      .single()

    if (profileError || !profile?.org_id) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }

    // Get query params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const fieldsParam = searchParams.get('fields') || 'name,email,phone,company,status,tags'
    const fields = fieldsParam.split(',')

    // Fetch all contacts for this organization
    const { data: contacts, error: fetchError } = await supabase
      .from('contacts')
      .select('*')
      .eq('org_id', profile.org_id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      )
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { error: 'No contacts to export' },
        { status: 404 }
      )
    }

    // Transform contacts based on selected fields
    const exportData = contacts.map((contact: any) => {
      const row: any = {}

      if (fields.includes('name')) {
        const name = contact.is_company
          ? contact.company_name
          : [contact.first_name, contact.last_name].filter(Boolean).join(' ')
        row['Name'] = name || contact.email || 'Unknown'
      }

      if (fields.includes('email')) {
        row['Email'] = contact.email || ''
      }

      if (fields.includes('phone')) {
        row['Phone'] = contact.phone || ''
      }

      if (fields.includes('company')) {
        row['Company'] = contact.is_company ? '' : (contact.company_name || '')
      }

      if (fields.includes('status')) {
        row['Status'] = contact.status || 'lead'
      }

      if (fields.includes('tags')) {
        row['Tags'] = Array.isArray(contact.tags) ? contact.tags.join(', ') : ''
      }

      if (fields.includes('createdAt')) {
        row['Created Date'] = contact.created_at ? new Date(contact.created_at).toISOString().split('T')[0] : ''
      }

      return row
    })

    // Generate file based on format
    if (format === 'csv') {
      // Generate CSV
      const csv = Papa.unparse(exportData)
      const filename = `contacts-export-${new Date().toISOString().split('T')[0]}.csv`

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } else if (format === 'xlsx') {
      // Generate Excel
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts')

      // Write to buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      const filename = `contacts-export-${new Date().toISOString().split('T')[0]}.xlsx`

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Unsupported format' },
        { status: 400 }
      )
    }

  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message
      },
      { status: 500 }
    )
  }
}
