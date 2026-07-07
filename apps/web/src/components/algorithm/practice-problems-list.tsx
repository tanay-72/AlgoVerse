import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import type { PracticeProblem } from '@algoverse/shared-types';
import { Badge } from '@/components/ui/badge';
import { DifficultyBadge } from './difficulty-badge';

const platformLabel: Record<PracticeProblem['platform'], string> = {
  LEETCODE: 'LeetCode',
  CODEFORCES: 'Codeforces',
  CSES: 'CSES',
  ATCODER: 'AtCoder',
  OTHER: 'Other',
};

export function PracticeProblemsList({ problems }: { problems: PracticeProblem[] }) {
  if (problems.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
      {problems.map((problem) => (
        <li key={problem.id}>
          <a
            href={problem.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              {problem.title}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <Badge variant="outline">{platformLabel[problem.platform]}</Badge>
              <DifficultyBadge difficulty={problem.difficulty} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
