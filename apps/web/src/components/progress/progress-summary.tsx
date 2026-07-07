import type { ProgressSummary } from '@algoverse/shared-types';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, ListChecks, Percent } from 'lucide-react';

export function ProgressSummaryTiles({ summary }: { summary: ProgressSummary }) {
  const tiles = [
    { label: 'Completed', value: summary.completedCount, icon: CheckCircle2 },
    { label: 'Remaining', value: summary.remainingCount, icon: Circle },
    { label: 'Total Algorithms', value: summary.totalCount, icon: ListChecks },
    { label: 'Completion', value: `${summary.completionPercentage}%`, icon: Percent },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tiles.map((tile) => (
        <Card key={tile.label}>
          <CardContent className="flex items-center gap-3 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <tile.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-semibold tabular-nums">{tile.value}</p>
              <p className="text-xs text-muted-foreground">{tile.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
