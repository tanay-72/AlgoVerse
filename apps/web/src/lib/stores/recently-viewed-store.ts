import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RecentlyViewedEntry } from '@algoverse/shared-types';

const MAX_ENTRIES = 12;

interface RecentlyViewedState {
  entries: RecentlyViewedEntry[];
  recordView: (entry: Omit<RecentlyViewedEntry, 'viewedAt'>) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      entries: [],

      recordView: (entry) =>
        set((state) => {
          const withoutDuplicate = state.entries.filter(
            (e) => e.algorithmSlug !== entry.algorithmSlug,
          );
          const updated = [
            { ...entry, viewedAt: new Date().toISOString() },
            ...withoutDuplicate,
          ].slice(0, MAX_ENTRIES);

          return { entries: updated };
        }),

      clear: () => set({ entries: [] }),
    }),
    { name: 'algoverse:recently-viewed' },
  ),
);
