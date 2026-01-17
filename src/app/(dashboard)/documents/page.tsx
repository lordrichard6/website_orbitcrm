import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
                    <p className="text-slate-600">Your knowledge base for AI context</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    📤 Upload Document
                </Button>
            </div>

            <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-900">Uploaded Documents</CardTitle>
                    <CardDescription className="text-slate-600">0 documents • 0 MB used</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-500 text-center py-12">
                        No documents yet. Upload PDFs, TXT, or MD files to build your knowledge base.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
