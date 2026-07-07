'use client';

import Link from 'next/link';
import { Bookmark, BookmarkX } from 'lucide-react';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BookmarksPage() {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">Bookmarks</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Saved locally in your browser — {bookmarks.length} algorithm
        {bookmarks.length === 1 ? '' : 's'} bookmarked.
      </p>

      {bookmarks.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <Bookmark className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You haven&apos;t bookmarked any algorithms yet.
          </p>
          <Button asChild size="sm" className="mt-2">
            <Link href="/explorer">Explore algorithms</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.algorithmSlug}>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <Link href={`/algorithms/${bookmark.algorithmSlug}`} className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{bookmark.algorithmName}</p>
                  <p className="text-xs text-muted-foreground">
                    Bookmarked{' '}
                    {new Date(bookmark.bookmarkedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove bookmark"
                  onClick={() => removeBookmark(bookmark.algorithmSlug)}
                >
                  <BookmarkX className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
