import type { Metadata } from 'next';
import { fetchCategories } from '@/lib/api/categories';
import { CategoryGrid } from '@/components/category/category-grid';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Every data structure and algorithm category covered on AlgoVerse.',
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Category Explorer</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {categories.length} categories covering the full breadth of core DSA topics.
      </p>

      <div className="mt-8">
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
