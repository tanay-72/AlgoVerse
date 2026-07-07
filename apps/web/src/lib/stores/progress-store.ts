import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressEntry } from '@algoverse/shared-types';

interface ProgressState {
  completed: ProgressEntry[];
  isCompleted: (algorithmSlug: string) => boolean;
  markCompleted: (entry: Omit<ProgressEntry, 'completedAt'>) => void;
  markIncomplete: (algorithmSlug: string) => void;
  toggleCompleted: (entry: Omit<ProgressEntry, 'completedAt'>) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: [],

      isCompleted: (algorithmSlug) =>
        get().completed.some((entry) => entry.algorithmSlug === algorithmSlug),

      markCompleted: (entry) =>
        set((state) => {
          if (state.completed.some((c) => c.algorithmSlug === entry.algorithmSlug)) {
            return state;
          }
          return {
            completed: [{ ...entry, completedAt: new Date().toISOString() }, ...state.completed],
          };
        }),

      markIncomplete: (algorithmSlug) =>
        set((state) => ({
          completed: state.completed.filter((c) => c.algorithmSlug !== algorithmSlug),
        })),

      toggleCompleted: (entry) => {
        const { isCompleted, markCompleted, markIncomplete } = get();
        if (isCompleted(entry.algorithmSlug)) {
          markIncomplete(entry.algorithmSlug);
        } else {
          markCompleted(entry);
        }
      },
    }),
    { name: 'algoverse:progress' },
  ),
);
