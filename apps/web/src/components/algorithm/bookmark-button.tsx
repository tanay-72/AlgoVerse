'use client';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';

interface BookmarkButtonProps {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
}

export function BookmarkButton({
  algorithmSlug,
  algorithmName,
  categorySlug,
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarksStore((state) => state.isBookmarked(algorithmSlug));
  const toggleBookmark = useBookmarksStore((state) => state.toggleBookmark);

  return (
    <Button
      variant={isBookmarked ? 'default' : 'outline'}
      size="sm"
      onClick={() => toggleBookmark({ algorithmSlug, algorithmName, categorySlug })}
      aria-pressed={isBookmarked}
    >
      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}
