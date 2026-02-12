/*
  OrbitCRM Database Seed
  Creates sample data for development and testing
*/

-- Create a demo organization
INSERT INTO organizations (id, name, slug, subscription_tier, token_balance, enabled_packs, settings)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Orbit Demo Agency',
  'orbit-demo',
  'pro',
  50000,
  ARRAY['consultant'],
  '{"branding": {"primary_color": "#3D4A67"}, "timezone": "Europe/Zurich"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Note: Profiles are created when users sign up via auth.users trigger
-- For seeding, we'll skip profiles since they require auth.users entries

-- Create demo contacts
INSERT INTO contacts (id, tenant_id, is_company, company_name, first_name, last_name, email, phone, status, tags, city, country, notes) VALUES
  ('a0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', false, 'TechCorp Inc', 'Sarah', 'Johnson', 'sarah.johnson@techcorp.com', '+1 415 555 0101', 'client', ARRAY['enterprise', 'tech'], 'San Francisco', 'US', 'Key enterprise client. Decision maker for tech projects.'),
  ('a0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', false, 'StartupHub', 'Michael', 'Chen', 'mchen@startuphub.io', '+1 628 555 0202', 'opportunity', ARRAY['startup', 'saas'], 'San Francisco', 'US', 'Interested in mobile app development.'),
  ('a0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', false, 'Design Studio Co', 'Emma', 'Williams', 'emma.w@designstudio.co', '+1 510 555 0303', 'lead', ARRAY['design', 'agency'], 'Oakland', 'US', 'Referred by Michael Chen.'),
  ('a0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', false, 'Global Ventures', 'James', 'Rodriguez', 'james@globalventures.com', '+1 925 555 0404', 'client', ARRAY['finance', 'investment'], 'Walnut Creek', 'US', 'Long-term client. CRM integration project ongoing.'),
  ('a0000005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', false, 'Innovate Labs', 'Lisa', 'Park', 'lpark@innovatelabs.dev', '+1 408 555 0505', 'opportunity', ARRAY['tech', 'ai'], 'San Jose', 'US', 'AI startup looking for consulting.'),
  ('a0000006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', false, 'RetailPlus', 'David', 'Kim', 'david.kim@retailplus.com', '+1 650 555 0606', 'lead', ARRAY['retail', 'ecommerce'], 'Palo Alto', 'US', 'E-commerce platform interest.'),
  ('a0000007-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', false, 'GreenTech Solutions', 'Anna', 'Martinez', 'anna@greentech.eco', '+1 831 555 0707', 'churned', ARRAY['sustainability', 'tech'], 'Santa Cruz', 'US', 'Previous client. Budget constraints.'),
  ('a0000008-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', false, 'Thompson & Associates', 'Robert', 'Thompson', 'rthompson@lawfirm.legal', '+1 415 555 0808', 'client', ARRAY['legal', 'professional'], 'San Francisco', 'US', 'Law firm. Website and document management.')
ON CONFLICT (id) DO NOTHING;

-- Create company contacts
INSERT INTO contacts (id, tenant_id, is_company, company_name, company_uid, email, phone, status, tags, city, country, notes) VALUES
  ('a0000009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', true, 'Swiss Tech AG', 'CHE-123.456.789', 'info@swisstech.ch', '+41 44 555 0101', 'client', ARRAY['enterprise', 'swiss'], 'Zurich', 'CH', 'Swiss enterprise client. Multiple projects.'),
  ('a0000010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', true, 'Lisbon Ventures Lda', 'PT507123456', 'contact@lisbonventures.pt', '+351 21 555 0202', 'opportunity', ARRAY['startup', 'portugal'], 'Lisbon', 'PT', 'Portuguese VC firm exploring partnership.')
ON CONFLICT (id) DO NOTHING;

-- Create demo projects
INSERT INTO projects (id, tenant_id, contact_id, name, description, status, deadline) VALUES
  ('b0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001', 'TechCorp Website Redesign', 'Complete overhaul of corporate website with new brand identity', 'active', NOW() + INTERVAL '30 days'),
  ('b0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'a0000002-0000-0000-0000-000000000002', 'StartupHub Mobile App', 'iOS and Android app for community engagement', 'lead', NOW() + INTERVAL '60 days'),
  ('b0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'a0000004-0000-0000-0000-000000000004', 'Global Ventures CRM Integration', 'Custom CRM integration with existing systems', 'active', NOW() + INTERVAL '14 days'),
  ('b0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'a0000006-0000-0000-0000-000000000006', 'RetailPlus E-commerce Platform', 'New e-commerce platform with AI recommendations', 'lead', NOW() + INTERVAL '90 days'),
  ('b0000005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'a0000003-0000-0000-0000-000000000003', 'Design Studio Brand Guidelines', 'Creating comprehensive brand guidelines document', 'completed', NOW() - INTERVAL '7 days'),
  ('b0000006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'a0000009-0000-0000-0000-000000000009', 'Swiss Tech Digital Transformation', 'Cloud migration and process automation', 'active', NOW() + INTERVAL '45 days')
ON CONFLICT (id) DO NOTHING;

-- Create demo tasks
INSERT INTO tasks (id, tenant_id, contact_id, project_id, title, description, status, priority, due_date) VALUES
  ('c0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'Review TechCorp wireframes', 'Review and approve wireframes for homepage redesign', 'done', 'high', NOW() - INTERVAL '2 days'),
  ('c0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'a0000002-0000-0000-0000-000000000002', 'b0000002-0000-0000-0000-000000000002', 'Prepare proposal for StartupHub', 'Draft mobile app development proposal with timeline', 'in_progress', 'high', NOW() + INTERVAL '3 days'),
  ('c0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'a0000004-0000-0000-0000-000000000004', 'b0000003-0000-0000-0000-000000000003', 'Schedule meeting with Global Ventures', 'Quarterly review meeting to discuss project progress', 'todo', 'medium', NOW() + INTERVAL '5 days'),
  ('c0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000001', 'Send invoice to TechCorp', 'Monthly invoice for website development work', 'todo', 'urgent', NOW()),
  ('c0000005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'a0000006-0000-0000-0000-000000000006', 'b0000004-0000-0000-0000-000000000004', 'Update RetailPlus requirements doc', 'Incorporate feedback from stakeholder meeting', 'in_progress', 'medium', NOW() + INTERVAL '7 days'),
  ('c0000006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'a0000006-0000-0000-0000-000000000006', 'b0000004-0000-0000-0000-000000000004', 'Research AI recommendation engines', 'Evaluate options for RetailPlus platform', 'todo', 'low', NOW() + INTERVAL '14 days'),
  ('c0000007-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'a0000005-0000-0000-0000-000000000005', NULL, 'Follow up with Lisa Park', 'Discuss partnership opportunity with Innovate Labs', 'todo', 'medium', NOW() + INTERVAL '2 days'),
  ('c0000008-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 'a0000003-0000-0000-0000-000000000003', 'b0000005-0000-0000-0000-000000000005', 'Review brand guidelines deliverable', 'Final review before sending to Design Studio', 'done', 'high', NOW() - INTERVAL '5 days'),
  ('c0000009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'a0000009-0000-0000-0000-000000000009', 'b0000006-0000-0000-0000-000000000006', 'Cloud architecture review', 'Review proposed cloud architecture with Swiss Tech team', 'in_progress', 'high', NOW() + INTERVAL '1 day'),
  ('c0000010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', NULL, NULL, 'Weekly team standup', 'Internal team sync every Monday', 'todo', 'low', NOW() + INTERVAL '4 days')
ON CONFLICT (id) DO NOTHING;

-- Create demo invoices
INSERT INTO invoices (id, tenant_id, project_id, contact_id, invoice_number, currency, amount_total, status, due_date, qr_reference, iban_used) VALUES
  ('d0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'INV-2026-001', 'USD', 12500.00, 'sent', NOW() + INTERVAL '30 days', NULL, 'US12 1234 5678 9012 3456 78'),
  ('d0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'b0000003-0000-0000-0000-000000000003', 'a0000004-0000-0000-0000-000000000004', 'INV-2026-002', 'USD', 8750.00, 'paid', NOW() - INTERVAL '15 days', NULL, 'US12 1234 5678 9012 3456 78'),
  ('d0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'b0000005-0000-0000-0000-000000000005', 'a0000003-0000-0000-0000-000000000003', 'INV-2026-003', 'USD', 3500.00, 'paid', NOW() - INTERVAL '10 days', NULL, 'US12 1234 5678 9012 3456 78'),
  ('d0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'b0000006-0000-0000-0000-000000000006', 'a0000009-0000-0000-0000-000000000009', 'INV-2026-004', 'CHF', 25000.00, 'sent', NOW() + INTERVAL '45 days', '000000000000000000000000000', 'CH93 0076 2011 6238 5295 7'),
  ('d0000005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'INV-2026-005', 'USD', 7500.00, 'draft', NOW() + INTERVAL '60 days', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Create demo documents
INSERT INTO documents (id, tenant_id, project_id, contact_id, name, file_path, file_type, visibility, embedding_status) VALUES
  ('e0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'TechCorp Brand Guidelines.pdf', 'documents/techcorp-brand.pdf', 'application/pdf', 'shared', 'pending'),
  ('e0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'b0000001-0000-0000-0000-000000000001', NULL, 'Website Wireframes v2.fig', 'documents/wireframes-v2.fig', 'application/figma', 'internal', 'pending'),
  ('e0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'b0000003-0000-0000-0000-000000000003', 'a0000004-0000-0000-0000-000000000004', 'CRM Integration Spec.docx', 'documents/crm-spec.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'shared', 'pending'),
  ('e0000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'b0000006-0000-0000-0000-000000000006', 'a0000009-0000-0000-0000-000000000009', 'Cloud Architecture Diagram.pdf', 'documents/cloud-arch.pdf', 'application/pdf', 'shared', 'pending'),
  ('e0000005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', NULL, NULL, 'Company SOW Template.docx', 'documents/sow-template.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'internal', 'pending')
ON CONFLICT (id) DO NOTHING;

-- Summary
DO $$
BEGIN
  RAISE NOTICE 'Seed completed:';
  RAISE NOTICE '- 1 organization (Orbit Demo Agency)';
  RAISE NOTICE '- 10 contacts (8 people + 2 companies)';
  RAISE NOTICE '- 6 projects';
  RAISE NOTICE '- 10 tasks';
  RAISE NOTICE '- 5 invoices';
  RAISE NOTICE '- 5 documents';
END $$;
