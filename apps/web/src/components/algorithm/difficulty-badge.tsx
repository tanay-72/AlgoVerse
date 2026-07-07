import type { Difficulty } from '@algoverse/shared-types';
import { Badge } from '@/components/ui/badge';

const variantByDifficulty: Record<Difficulty, 'success' | 'warning' | 'destructive'> = {
  EASY: 'success',
  MEDIUM: 'warning',
  HARD: 'destructive',
};

const labelByDifficulty: Record<Difficulty, string> = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge variant={variantByDifficulty[difficulty]}>{labelByDifficulty[difficulty]}</Badge>;
}
