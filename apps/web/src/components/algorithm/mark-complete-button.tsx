'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/stores/progress-store';

interface MarkCompleteButtonProps {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
}

export function MarkCompleteButton({
  algorithmSlug,
  algorithmName,
  categorySlug,
}: MarkCompleteButtonProps) {
  const isCompleted = useProgressStore((state) => state.isCompleted(algorithmSlug));
  const toggleCompleted = useProgressStore((state) => state.toggleCompleted);

  return (
    <Button
      variant={isCompleted ? 'default' : 'outline'}
      size="sm"
      onClick={() => toggleCompleted({ algorithmSlug, algorithmName, categorySlug })}
      aria-pressed={isCompleted}
    >
      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {isCompleted ? 'Completed' : 'Mark as Complete'}
    </Button>
  );
}
