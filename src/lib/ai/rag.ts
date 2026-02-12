import { createClient } from '@/lib/supabase/server';
import { searchDocuments } from './document-search';
import { type DocVisibility } from '../types/schema';

/**
 * RAG (Retrieval-Augmented Generation) Service
 * Provides context-aware document search for AI chat
 */

export interface RAGDocument {
  id: string;
  name: string;
  content: string;
  similarity: number;
  visibility: DocVisibility;
  documentId: string;
}

export const RagService = {
  /**
   * Search similar documents for RAG context injection
   * This is called by the AI chat tool when users ask questions
   */
  async searchSimilarDocuments(
    query: string,
    orgId: string,
    visibilityFilter: DocVisibility[]
  ): Promise<RAGDocument[]> {
    try {
      // Use visibility 'all' if both internal and shared are allowed
      const visibility = visibilityFilter.length === 2 ? 'all' : visibilityFilter[0];

      // Search using our vector similarity search
      const results = await searchDocuments(query, orgId, {
        limit: 5,
        threshold: 0.5, // Minimum 50% similarity
        visibility,
      });

      // Transform to RAG format
      return results.map(result => ({
        id: result.id,
        name: result.documentName,
        content: result.content,
        similarity: result.similarity,
        visibility: result.visibility,
        documentId: result.documentId,
      }));
    } catch (error) {
      console.error('RAG search error:', error);
      // Return empty array on error - don't fail the chat request
      return [];
    }
  },

  /**
   * Format RAG results for AI context injection
   * Creates a formatted string to inject into the system prompt
   */
  formatRAGContext(documents: RAGDocument[]): string {
    if (documents.length === 0) {
      return '';
    }

    const formattedDocs = documents
      .map((doc, idx) => {
        const matchPercentage = (doc.similarity * 100).toFixed(0);
        return `[${idx + 1}] Document: "${doc.name}" (${matchPercentage}% relevance)
Content: ${doc.content}

---`;
      })
      .join('\n\n');

    return `

=== RELEVANT DOCUMENTS ===

The following documents from the knowledge base are relevant to the user's question:

${formattedDocs}

Please use this information to provide an accurate, context-aware response. Cite specific documents when appropriate.

=========================
`;
  },

  /**
   * Extract citations from documents for display in chat
   */
  extractCitations(documents: RAGDocument[]): Array<{
    documentId: string;
    documentName: string;
    similarity: number;
  }> {
    return documents.map(doc => ({
      documentId: doc.documentId,
      documentName: doc.name,
      similarity: doc.similarity,
    }));
  },
};
