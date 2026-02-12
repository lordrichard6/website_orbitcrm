
import { createClient } from '@/lib/supabase/server';
import { generateInvoicePDF } from '@/lib/invoices/pdf-generator';
import type { InvoiceWithLineItems } from '@/stores/invoice-store';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Fetch Invoice Data with Lines & Contact
    const { data: invoice, error } = await supabase
        .from('invoices')
        .select(`
        *,
        contacts (
            id, first_name, last_name, company_name, is_company, email, 
            phone, address_line1, address_line2, city, state, postal_code, country
        )
    `)
        .eq('id', id)
        .single();

    if (error || !invoice) {
        return new Response('Invoice not found', { status: 404 });
    }

    // 2. Fetch Line Items
    const { data: lineItems } = await supabase
        .from('invoice_line_items')
        .select('*')
        .eq('invoice_id', id)
        .order('sort_order', { ascending: true });

    const fullInvoice: InvoiceWithLineItems = {
        ...invoice,
        contact: invoice.contacts,
        line_items: lineItems || [],
    };

    // 3. Fetch Organization Settings (for branding/IBAN)
    const { data: profile } = await supabase.auth.getUser();
    // Assuming the user requesting is authorized or we check tenant_id

    // Security check: Ensure user belongs to the same tenant as invoice
    // (Simplified for now, assuming RLS handles basic access, but for API generation we need settings)

    const { data: org } = await supabase
        .from('organizations')
        .select('settings')
        .eq('id', invoice.tenant_id)
        .single();

    const settings = (org?.settings as any) || {};

    try {
        // 4. Generate PDF
        const pdfBuffer = await generateInvoicePDF(fullInvoice, settings);

        // 5. Return Response
        return new Response(pdfBuffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${invoice.invoice_number}.pdf"`,
            },
        });
    } catch (err) {
        console.error('PDF Generation Error:', err);
        return new Response('Failed to generate PDF', { status: 500 });
    }
}
