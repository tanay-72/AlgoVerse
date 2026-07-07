import type { Metadata } from 'next';
import { fetchComplexityReferences } from '@/lib/api/complexities';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Complexity Reference',
  description: 'A quick-reference glossary of Big-O time and space complexity classes.',
};

export const dynamic = 'force-dynamic';

export default async function ComplexitiesPage() {
  const references = await fetchComplexityReferences();

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Complexity Reference</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A glossary of the Big-O notations you&apos;ll see across every algorithm page, from
        fastest to slowest.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {references.map((reference) => (
          <Card key={reference.id}>
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-lg font-semibold text-primary">
                  {reference.notation}
                </span>
                <span className="text-sm font-medium">{reference.name}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {reference.description}
              </p>
              <p className="text-xs text-muted-foreground/80">
                <span className="font-medium">Example:</span> {reference.example}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
