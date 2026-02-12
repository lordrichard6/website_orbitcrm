-- Enable pgvector extension for vector embeddings
-- This extension allows us to store and query high-dimensional vectors
-- Used for semantic search in the RAG (Retrieval-Augmented Generation) system

CREATE EXTENSION IF NOT EXISTS vector;

-- Verify the extension is enabled
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Add index to document_chunks.embedding for faster similarity search
-- Using ivfflat (Inverted File with Flat quantization) for efficient ANN search
-- lists=100 is good for ~10K-100K vectors
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx
ON document_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Note: For the index to be used effectively, you need to run:
-- VACUUM ANALYZE document_chunks;
-- after inserting a significant number of embeddings

-- Add helpful comments
COMMENT ON INDEX document_chunks_embedding_idx IS
'IVFFlat index for fast cosine similarity search on embeddings.
Run VACUUM ANALYZE document_chunks after bulk inserts.';

COMMENT ON COLUMN document_chunks.embedding IS
'1536-dimensional OpenAI embedding vector (text-embedding-3-small model)';
