import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { summarySelect, AlgorithmSummaryRecord } from '../algorithms/algorithms.repository';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(
    query: SearchQueryDto,
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

  private buildWhere(query: SearchQueryDto): Prisma.AlgorithmWhereInput {
    const where: Prisma.AlgorithmWhereInput = {};

    if (query.q) {
      where.OR = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { summary: { contains: query.q, mode: 'insensitive' } },
        { tags: { has: query.q.toLowerCase() } },
      ];
    }

    if (query.category) {
      where.category = { slug: query.category };
    }

    if (query.difficulty) {
      where.difficulty = query.difficulty;
    }

    if (query.tag) {
      where.tags = { has: query.tag };
    }

    if (query.complexity) {
      where.timeComplexityAverage = { contains: query.complexity };
    }

    return where;
  }
}
