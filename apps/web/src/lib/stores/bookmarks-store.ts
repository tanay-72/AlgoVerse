import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookmarkEntry } from '@algoverse/shared-types';

interface BookmarksState {
  bookmarks: BookmarkEntry[];
  isBookmarked: (algorithmSlug: string) => boolean;
  addBookmark: (entry: Omit<BookmarkEntry, 'bookmarkedAt'>) => void;
  removeBookmark: (algorithmSlug: string) => void;
  toggleBookmark: (entry: Omit<BookmarkEntry, 'bookmarkedAt'>) => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      isBookmarked: (algorithmSlug) =>
        get().bookmarks.some((bookmark) => bookmark.algorithmSlug === algorithmSlug),

      addBookmark: (entry) =>
        set((state) => {
          if (state.bookmarks.some((b) => b.algorithmSlug === entry.algorithmSlug)) {
            return state;
          }
          return {
            bookmarks: [{ ...entry, bookmarkedAt: new Date().toISOString() }, ...state.bookmarks],
          };
        }),

      removeBookmark: (algorithmSlug) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.algorithmSlug !== algorithmSlug),
        })),

      toggleBookmark: (entry) => {
        const { isBookmarked, addBookmark, removeBookmark } = get();
        if (isBookmarked(entry.algorithmSlug)) {
          removeBookmark(entry.algorithmSlug);
        } else {
          addBookmark(entry);
        }
      },
    }),
    { name: 'algoverse:bookmarks' },
  ),
);
