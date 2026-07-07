import { Injectable } from '@nestjs/common';
import type { Category as PrismaCategory } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

export type CategoryWithCount = PrismaCategory & { _count: { algorithms: number } };

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<CategoryWithCount[]> {
    return this.prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { algorithms: true } } },
    });
  }

  findBySlug(slug: string): Promise<CategoryWithCount | null> {
    return this.prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { algorithms: true } } },
    });
  }
}
