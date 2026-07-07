import type { ComplexityReference } from '@algoverse/shared-types';
import { apiFetch } from './client';

export async function fetchComplexityReferences(): Promise<ComplexityReference[]> {
  const result = await apiFetch<ComplexityReference[]>('/complexities');
  return result.data;
}
