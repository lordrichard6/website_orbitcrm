'use client';

import * as React from 'react';
import { ZefixService, type ZefixCompany } from '@/lib/services/zefix';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Search } from 'lucide-react';

interface CompanyLookupProps {
    onSelect: (company: ZefixCompany) => void;
}

export function CompanyLookup({ onSelect }: CompanyLookupProps) {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<ZefixCompany[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setResults([]);
        try {
            const data = await ZefixService.searchByName(query);
            setResults(data);
            setIsOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative space-y-2">
            <Label>Search Swiss Company (Zefix)</Label>
            <div className="flex gap-2">
                <Input
                    placeholder="e.g. Nestle, UBS..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading} type="button">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </Button>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full bg-white dark:bg-slate-950 border rounded-md shadow-lg mt-1 max-h-64 overflow-y-auto">
                    {results.map((company) => (
                        <div
                            key={company.uidFormatted}
                            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer border-b last:border-0"
                            onClick={() => {
                                onSelect(company);
                                setIsOpen(false);
                                setResults([]);
                                setQuery(company.name);
                            }}
                        >
                            <div className="font-medium">{company.name}</div>
                            <div className="text-xs text-slate-500">
                                {company.address.street} {company.address.houseNumber}, {company.address.postalCode} {company.address.city}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">{company.uidFormatted}</div>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && results.length === 0 && !loading && (
                <div className="text-sm text-slate-500 mt-2">No companies found.</div>
            )}
        </div>
    );
}
