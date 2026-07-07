import { Injectable } from '@nestjs/common';
import type { ComplexityReference as PrismaComplexityReference } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ComplexitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<PrismaComplexityReference[]> {
    return this.prisma.complexityReference.findMany({ orderBy: { order: 'asc' } });
  }
}
