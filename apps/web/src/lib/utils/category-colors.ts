/**
 * A curated set of muted accent colors, hashed per category slug so the
 * grid is easier to scan at a glance — deliberately restrained (tinted
 * backgrounds, no saturated/neon colors) to stay consistent with the rest
 * of the neutral palette. Hashing by slug (rather than category order)
 * means any component with just a category slug can look up a color
 * without needing the full category record.
 *
 * Every class string below is written out in full (no dynamic
 * interpolation) because Tailwind's JIT compiler only generates CSS for
 * class names it can find literally in source.
 */
const categoryColorPalette = [
  {
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'hover:border-indigo-500/40',
    groupHoverText: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  },
  {
    bg: 'bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-500/40',
    groupHoverText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  {
    bg: 'bg-sky-500/15',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'hover:border-sky-500/40',
    groupHoverText: 'group-hover:text-sky-600 dark:group-hover:text-sky-400',
  },
  {
    bg: 'bg-teal-500/15',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'hover:border-teal-500/40',
    groupHoverText: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
  },
  {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'hover:border-emerald-500/40',
    groupHoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
  },
  {
    bg: 'bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'hover:border-amber-500/40',
    groupHoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
  {
    bg: 'bg-rose-500/15',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'hover:border-rose-500/40',
    groupHoverText: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
  },
  {
    bg: 'bg-fuchsia-500/15',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
    border: 'hover:border-fuchsia-500/40',
    groupHoverText: 'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400',
  },
  {
    bg: 'bg-violet-500/15',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'hover:border-violet-500/40',
    groupHoverText: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  },
  {
    bg: 'bg-cyan-500/15',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'hover:border-cyan-500/40',
    groupHoverText: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  },
] as const;

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export interface CategoryColor {
  bg: string;
  text: string;
  border: string;
  groupHoverText: string;
}

export function getCategoryColor(slug: string): CategoryColor {
  return categoryColorPalette[hashSlug(slug) % categoryColorPalette.length] ?? categoryColorPalette[0];
}
