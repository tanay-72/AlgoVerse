import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchContent } from '@/components/search/search-content';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search AlgoVerse by algorithm name, tag, category, or difficulty.',
};

export default function SearchPage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Search</h1>
      <Suspense>
        <SearchContent />
      </Suspense>
    </div>
  );
}
