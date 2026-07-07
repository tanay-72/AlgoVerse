import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import type { ExternalLink } from '@algoverse/shared-types';

const platformLabel: Record<ExternalLink['platform'], string> = {
  LEETCODE: 'LeetCode',
  CODEFORCES: 'Codeforces',
  CSES: 'CSES',
  ATCODER: 'AtCoder',
  OTHER: 'Other',
};

export function ExternalLinksList({ links }: { links: ExternalLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <ExternalLinkIcon className="h-3 w-3" />
          {platformLabel[link.platform]} · {link.label}
        </a>
      ))}
    </div>
  );
}
