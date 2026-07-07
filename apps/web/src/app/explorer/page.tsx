import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CategorySidebar } from '@/components/layout/category-sidebar';
import { ExplorerContent } from '@/components/explorer/explorer-content';

export const metadata: Metadata = {
  title: 'Algorithm Explorer',
  description: 'Browse every algorithm on AlgoVerse, filterable by category and difficulty.',
};

export default function ExplorerPage() {
  return (
    <div className="container flex gap-8 py-10">
      <Suspense>
        <CategorySidebar />
      </Suspense>
      <div className="min-w-0 flex-1">
        <Suspense>
          <ExplorerContent />
        </Suspense>
      </div>
    </div>
  );
}
