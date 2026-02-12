# RAG Knowledge Base Setup Guide

## 1. Supabase Storage Bucket Setup

The document upload feature requires a Supabase Storage bucket named `documents`.

### Create the bucket:

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure as follows:
   - **Name**: `documents`
   - **Public**: **OFF** (private bucket)
   - **File size limit**: 10MB (or adjust as needed)
   - **Allowed MIME types**: Leave empty (we validate in code)

### Set up RLS policies:

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can upload documents to their organization's folder
CREATE POLICY "Users can upload documents to their org"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM profiles
    WHERE id = auth.uid()
  )
);

-- Policy: Users can read documents from their organization
CREATE POLICY "Users can read their org's documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM profiles
    WHERE id = auth.uid()
  )
);

-- Policy: Users can delete documents from their organization
CREATE POLICY "Users can delete their org's documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM profiles
    WHERE id = auth.uid()
  )
);
```

## 2. Test the Upload Feature

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/documents`

3. Click "Upload Document"

4. Try uploading:
   - ✅ PDF file
   - ✅ TXT file
   - ✅ MD file
   - ✅ DOCX file

5. Verify:
   - File appears in the table
   - Status shows "Pending" (will be "Processing" after Task #2)
   - Download button works
   - Delete button works
   - Visibility toggle works (Internal ↔ Shared)

## 3. Document Processing (Task #2 ✅ COMPLETE)

After uploading a document, you need to process it to enable AI search:

### Manual Processing:

1. Upload a document (status will be "Pending")
2. Click the **purple sparkle icon** (✨) in the Actions column
3. Processing will:
   - Extract text from the file (PDF, DOCX, TXT, MD)
   - Split text into chunks (1000 chars with 200 overlap)
   - Generate OpenAI embeddings (text-embedding-3-small)
   - Store chunks with embeddings in `document_chunks` table
4. Status changes: Pending → Processing → Ready
5. Document is now searchable by AI!

### Processing Details:

**Text Extraction:**
- PDF: `pdf-parse` library
- DOCX: `mammoth` library
- TXT/MD: UTF-8 decoding

**Chunking:**
- Chunk size: 1000 characters
- Overlap: 200 characters (preserves context)
- Smart splitting: Tries paragraphs → sentences → words → characters

**Embeddings:**
- Model: `text-embedding-3-small` (1536 dimensions)
- Cost: ~$0.02 per 1M tokens (~$0.00002 per 1K tokens)
- Batch processing for efficiency

**Database:**
- Chunks stored in `document_chunks` table
- pgvector extension enabled (run migration first)
- IVFFlat index for fast similarity search

### API Endpoints:

**POST `/api/documents/process`**
```json
{
  "documentId": "uuid"
}
```

**GET `/api/documents/process?documentId=uuid`**
Returns processing status and chunk count.

## 4. Troubleshooting

### "Failed to upload file to storage"

**Possible causes:**
1. Storage bucket doesn't exist
2. RLS policies not set up correctly
3. User's org_id is null

**Solution:**
```sql
-- Check user's org_id
SELECT id, org_id FROM profiles WHERE id = auth.uid();

-- Check storage policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```

### "No organization found"

**Cause:** User profile doesn't have an org_id

**Solution:**
```sql
-- Assign user to an organization
UPDATE profiles
SET org_id = (SELECT id FROM organizations LIMIT 1)
WHERE id = auth.uid();
```

### Upload succeeds but file not visible

**Cause:** RLS policy might be too restrictive

**Solution:** Test with a simpler policy first:
```sql
-- Temporary permissive policy for testing
CREATE POLICY "temp_allow_all" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'documents');
```

## 5. File Structure

```
/documents (bucket)
  /{org_id}/
    /1707686400000-abc123-document.pdf
    /1707686500000-def456-report.docx
    /...
```

Files are organized by organization to ensure multi-tenancy isolation.

## 6. Security Considerations

- ✅ Files are private (not publicly accessible)
- ✅ RLS ensures org-level isolation
- ✅ File type validation in API
- ✅ File size limits enforced (10MB)
- ✅ Filenames sanitized to prevent path traversal
- ✅ Storage and DB operations are atomic (rollback on failure)

## 7. API Endpoints

### POST `/api/documents/upload`

**Request:** `multipart/form-data`
```
file: File
visibility: 'internal' | 'shared'
project_id?: string (optional)
contact_id?: string (optional)
```

**Response:**
```json
{
  "success": true,
  "id": "uuid",
  "name": "document.pdf",
  "size": 1024000,
  "path": "org-uuid/timestamp-random-document.pdf"
}
```

**Errors:**
- `401` - Unauthorized (no auth)
- `400` - No file, file too large, invalid type
- `500` - Storage or database error
