import type { Metadata } from 'next';
import { fetchComplexityReferences } from '@/lib/api/complexities';
import { ComplexityCard } from '@/components/complexity/complexity-card';

export const metadata: Metadata = {
  title: 'Complexity Reference',
  description: 'A quick-reference glossary of Big-O time and space complexity classes.',
};

export const dynamic = 'force-dynamic';

export default async function ComplexitiesPage() {
  const references = await fetchComplexityReferences();

  return (
    <div className="container max-w-2xl py-12 animate-slide-in-right">
      <h1 className="text-3xl font-extrabold tracking-tight">Complexity Reference</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A glossary of the Big-O notations you&apos;ll see across every algorithm page, from
        fastest to slowest.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {references.map((reference) => (
          <ComplexityCard key={reference.id} reference={reference} />
        ))}
      </div>
    </div>
  );
}
