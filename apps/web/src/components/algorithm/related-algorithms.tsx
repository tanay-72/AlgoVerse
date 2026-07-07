import Link from 'next/link';
import type { AlgorithmSummary } from '@algoverse/shared-types';
import { Card, CardContent } from '@/components/ui/card';
import { DifficultyBadge } from './difficulty-badge';

export function RelatedAlgorithms({ algorithms }: { algorithms: AlgorithmSummary[] }) {
  if (algorithms.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {algorithms.map((algorithm) => (
        <Link key={algorithm.id} href={`/algorithms/${algorithm.slug}`}>
          <Card className="transition-colors hover:border-primary/40">
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-medium">{algorithm.name}</p>
                <p className="text-xs text-muted-foreground">{algorithm.category.name}</p>
              </div>
              <DifficultyBadge difficulty={algorithm.difficulty} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
