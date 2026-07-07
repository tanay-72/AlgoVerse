'use client';

import { useEffect } from 'react';
import { useRecentlyViewedStore } from '@/lib/stores/recently-viewed-store';

interface RecordViewProps {
  algorithmSlug: string;
  algorithmName: string;
  categorySlug: string;
}

export function RecordView({ algorithmSlug, algorithmName, categorySlug }: RecordViewProps) {
  const recordView = useRecentlyViewedStore((state) => state.recordView);

  useEffect(() => {
    recordView({ algorithmSlug, algorithmName, categorySlug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmSlug]);

  return null;
}
