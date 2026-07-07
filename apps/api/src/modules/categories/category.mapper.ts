import type { Category } from '@algoverse/shared-types';
import type { CategoryWithCount } from './categories.repository';

export class CategoryMapper {
  static toDto(entity: CategoryWithCount): Category {
    return {
      id: entity.id,
      slug: entity.slug,
      name: entity.name,
      description: entity.description,
      icon: entity.icon,
      order: entity.order,
      algorithmCount: entity._count.algorithms,
    };
  }
}
