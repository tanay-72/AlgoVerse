import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { QueryAlgorithmsDto } from './dto/query-algorithms.dto';

const summarySelect = Prisma.validator<Prisma.AlgorithmSelect>()({
  id: true,
  slug: true,
  name: true,
  summary: true,
  difficulty: true,
  tags: true,
  timeComplexityAverage: true,
  spaceComplexity: true,
  category: { select: { id: true, slug: true, name: true, icon: true } },
});

export type AlgorithmSummaryRecord = Prisma.AlgorithmGetPayload<{ select: typeof summarySelect }>;

const detailInclude = Prisma.validator<Prisma.AlgorithmInclude>()({
  category: { select: { id: true, slug: true, name: true, icon: true } },
  practiceProblems: true,
  externalLinks: true,
  relatedFrom: {
    include: {
      related: { select: summarySelect },
    },
  },
});

export type AlgorithmDetailRecord = Prisma.AlgorithmGetPayload<{ include: typeof detailInclude }>;

@Injectable()
export class AlgorithmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    query: QueryAlgorithmsDto,
  ): Promise<{ items: AlgorithmSummaryRecord[]; total: number }> {
    const where = this.buildWhere(query);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.algorithm.findMany({
        where,
        select: summarySelect,
        orderBy: { name: 'asc' },
        skip: query.skip,
        take: query.pageSize,
      }),
      this.prisma.algorithm.count({ where }),
    ]);

    return { items, total };
  }

  findBySlug(slug: string): Promise<AlgorithmDetailRecord | null> {
    return this.prisma.algorithm.findUnique({
      where: { slug },
      include: detailInclude,
    });
  }

  private buildWhere(query: QueryAlgorithmsDto): Prisma.AlgorithmWhereInput {
    const where: Prisma.AlgorithmWhereInput = {};

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.difficulty) {
      where.difficulty = query.difficulty;
    }

    if (query.tag) {
      where.tags = { has: query.tag };
    }

    return where;
  }
}

export { summarySelect, detailInclude };
