import { openai } from '@ai-sdk/openai';
import { embed, embedMany } from 'ai';

/**
 * Generate embeddings using OpenAI's text-embedding-3-small model
 * Cost: $0.02 per 1M tokens (~$0.00002 per 1K tokens)
 * Dimensions: 1536
 */

const EMBEDDING_MODEL = 'text-embedding-3-small';

export interface EmbeddingResult {
  embedding: number[];
  tokens: number;
}

export interface BatchEmbeddingResult {
  embeddings: number[][];
  totalTokens: number;
}

/**
 * Generate embedding for a single text chunk
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  if (!text || text.trim().length === 0) {
    throw new Error('Cannot generate embedding for empty text');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  try {
    const { embedding, usage } = await embed({
      model: openai.embedding(EMBEDDING_MODEL),
      value: text,
    });

    return {
      embedding,
      tokens: usage.tokens,
    };
  } catch (error) {
    console.error('Embedding generation error:', error);
    throw new Error('Failed to generate embedding');
  }
}

/**
 * Generate embeddings for multiple text chunks (batch)
 * More efficient than calling generateEmbedding multiple times
 */
export async function generateEmbeddings(texts: string[]): Promise<BatchEmbeddingResult> {
  if (!texts || texts.length === 0) {
    throw new Error('Cannot generate embeddings for empty array');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  // Filter out empty strings
  const validTexts = texts.filter(t => t && t.trim().length > 0);

  if (validTexts.length === 0) {
    throw new Error('No valid texts to embed');
  }

  try {
    const { embeddings, usage } = await embedMany({
      model: openai.embedding(EMBEDDING_MODEL),
      values: validTexts,
    });

    return {
      embeddings,
      totalTokens: usage.tokens,
    };
  } catch (error) {
    console.error('Batch embedding generation error:', error);
    throw new Error('Failed to generate embeddings');
  }
}

/**
 * Generate embedding for a search query
 * Same model as document embeddings for consistency
 */
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const result = await generateEmbedding(query);
  return result.embedding;
}

/**
 * Calculate cosine similarity between two embeddings
 * Returns value between -1 and 1 (higher = more similar)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Estimate token count for text (rough approximation)
 * Actual token count will be slightly different
 */
export function estimateTokenCount(text: string): number {
  // Rough approximation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
}

/**
 * Calculate estimated cost for embedding text
 * Returns cost in USD
 */
export function estimateEmbeddingCost(text: string): number {
  const tokens = estimateTokenCount(text);
  const costPerThousandTokens = 0.00002; // $0.02 per 1M tokens
  return (tokens / 1000) * costPerThousandTokens;
}
