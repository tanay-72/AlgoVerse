export type SeedDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SeedPlatform = 'LEETCODE' | 'CODEFORCES' | 'CSES' | 'ATCODER' | 'OTHER';

export interface CategorySeed {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface ComplexityReferenceSeed {
  notation: string;
  name: string;
  description: string;
  example: string;
  order: number;
}

export interface PracticeProblemSeed {
  title: string;
  url: string;
  platform: SeedPlatform;
  difficulty: SeedDifficulty;
}

export interface ExternalLinkSeed {
  platform: SeedPlatform;
  label: string;
  url: string;
}

export interface AlgorithmSeed {
  slug: string;
  name: string;
  categorySlug: string;
  difficulty: SeedDifficulty;
  summary: string;
  introduction: string;
  problemStatement: string;
  intuition: string;
  stepByStep: string[];
  dryRun: string;
  timeComplexityBest: string;
  timeComplexityAverage: string;
  timeComplexityWorst: string;
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  commonMistakes: string[];
  visualizationNotes: string;
  tags: string[];
  cppCode: string;
  pythonCode: string;
  practiceProblems: PracticeProblemSeed[];
  externalLinks: ExternalLinkSeed[];
  relatedSlugs: string[];
}
