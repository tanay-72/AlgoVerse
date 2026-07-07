export const Difficulty = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const Platform = {
  LEETCODE: 'LEETCODE',
  CODEFORCES: 'CODEFORCES',
  CSES: 'CSES',
  ATCODER: 'ATCODER',
  OTHER: 'OTHER',
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];
