import type { Category } from '@algoverse/shared-types';
import { apiFetch } from './client';

export async function fetchCategories(): Promise<Category[]> {
  const result = await apiFetch<Category[]>('/categories');
  return result.data;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  const result = await apiFetch<Category>(`/categories/${slug}`);
  return result.data;
}
