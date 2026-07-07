import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCategoryBySlug } from '@/lib/api/categories';
import { fetchAlgorithms } from '@/lib/api/algorithms';
import { AlgorithmList } from '@/components/algorithm/algorithm-list';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { ApiError } from '@/lib/api/client';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const category = await fetchCategoryBySlug(params.slug);
    return { title: category.name, description: category.description };
  } catch {
    return { title: 'Category' };
  }
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  let category;
  try {
    category = await fetchCategoryBySlug(params.slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const { items: algorithms } = await fetchAlgorithms({ category: category.slug, pageSize: 50 });
  const Icon = getCategoryIcon(category.icon);

  return (
    <div className="container py-10">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{category.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <AlgorithmList
          algorithms={algorithms}
          emptyMessage="No algorithms have been published in this category yet."
        />
      </div>
    </div>
  );
}
