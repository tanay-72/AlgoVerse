import { Injectable } from '@nestjs/common';
import type { Category } from '@algoverse/shared-types';
import { ResourceNotFoundException } from '../../common/exceptions/resource-not-found.exception';
import { CategoriesRepository } from './categories.repository';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();
    return categories.map(CategoryMapper.toDto);
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.categoriesRepository.findBySlug(slug);

    if (!category) {
      throw new ResourceNotFoundException('Category', slug);
    }

    return CategoryMapper.toDto(category);
  }
}
