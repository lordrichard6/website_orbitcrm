
import { NextRequest, NextResponse } from 'next/server';
import { RagService } from '@/lib/ai/rag';

export async function POST(req: NextRequest) {
    try {
        const { docId, content } = await req.json();
        if (!docId || !content) return NextResponse.json({ error: 'Missing Data' }, { status: 400 });

        await RagService.embedDocument(docId, content);

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
