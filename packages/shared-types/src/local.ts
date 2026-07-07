/**
 * Types for data persisted entirely in the browser via LocalStorage.
 * AlgoVerse has no authentication and no server-side user state — all
 * personalization lives on the client.
 */

export interface BookmarkEntry {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
  bookmarkedAt: string;
}

export interface ProgressEntry {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
  completedAt: string;
}

export interface RecentlyViewedEntry {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
  viewedAt: string;
}

export type ThemePreference = 'light' | 'dark' | 'system';

export interface CategoryProgress {
  categorySlug: string;
  categoryName: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface ProgressSummary {
  completedCount: number;
  remainingCount: number;
  totalCount: number;
  completionPercentage: number;
  byCategory: CategoryProgress[];
}
