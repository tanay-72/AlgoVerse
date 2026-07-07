import Link from 'next/link';
import type { AlgorithmSummary } from '@algoverse/shared-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { DifficultyBadge } from './difficulty-badge';

export function AlgorithmCard({ algorithm }: { algorithm: AlgorithmSummary }) {
  const Icon = getCategoryIcon(algorithm.category.icon);

  return (
    <Link href={`/algorithms/${algorithm.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {algorithm.category.name}
            </span>
            <DifficultyBadge difficulty={algorithm.difficulty} />
          </div>
          <CardTitle className="text-base leading-snug group-hover:text-primary">
            {algorithm.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">{algorithm.summary}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap items-center gap-2 pt-0">
          <Badge variant="outline" className="font-mono text-[11px]">
            {algorithm.timeComplexityAverage}
          </Badge>
          {algorithm.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
