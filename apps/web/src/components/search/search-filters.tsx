'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategories } from '@/lib/query/use-categories';

const difficulties = ['EASY', 'MEDIUM', 'HARD'] as const;
const complexityOptions = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'] as const;

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: categories } = useCategories();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={searchParams.get('category') ?? 'all'}
        onValueChange={(value) => updateParam('category', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('difficulty') ?? 'all'}
        onValueChange={(value) => updateParam('difficulty', value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All difficulties</SelectItem>
          {difficulties.map((difficulty) => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('complexity') ?? 'all'}
        onValueChange={(value) => updateParam('complexity', value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Complexity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All complexities</SelectItem>
          {complexityOptions.map((complexity) => (
            <SelectItem key={complexity} value={complexity}>
              {complexity}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
