import type { Difficulty, Platform } from './enums';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  algorithmCount?: number;
}

export interface PracticeProblem {
  id: string;
  title: string;
  url: string;
  platform: Platform;
  difficulty: Difficulty;
}

export interface ExternalLink {
  id: string;
  platform: Platform;
  label: string;
  url: string;
}

export interface AlgorithmImplementation {
  cpp: string;
  python: string;
}

export interface ComplexityDetail {
  best: string;
  average: string;
  worst: string;
  space: string;
}

/**
 * Lightweight representation used in list views, search results, and cards.
 */
export interface AlgorithmSummary {
  id: string;
  slug: string;
  name: string;
  summary: string;
  difficulty: Difficulty;
  tags: string[];
  timeComplexityAverage: string;
  spaceComplexity: string;
  category: Pick<Category, 'id' | 'slug' | 'name' | 'icon'>;
}

/**
 * Full representation used on the algorithm detail page.
 */
export interface Algorithm extends AlgorithmSummary {
  introduction: string;
  problemStatement: string;
  intuition: string;
  stepByStep: string[];
  dryRun: string;
  complexity: ComplexityDetail;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  commonMistakes: string[];
  visualizationNotes: string;
  implementation: AlgorithmImplementation;
  practiceProblems: PracticeProblem[];
  externalLinks: ExternalLink[];
  relatedAlgorithms: AlgorithmSummary[];
  createdAt: string;
  updatedAt: string;
}

export interface ComplexityReference {
  id: string;
  notation: string;
  name: string;
  description: string;
  example: string;
  order: number;
}
