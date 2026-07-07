import { Controller, Get, Param, Query } from '@nestjs/common';
import type { Algorithm, AlgorithmSummary } from '@algoverse/shared-types';
import { AlgorithmsService } from './algorithms.service';
import { QueryAlgorithmsDto } from './dto/query-algorithms.dto';
import { PaginatedResult } from '../../common/utils/paginate';

@Controller('algorithms')
export class AlgorithmsController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  findMany(@Query() query: QueryAlgorithmsDto): Promise<PaginatedResult<AlgorithmSummary>> {
    return this.algorithmsService.findMany(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Algorithm> {
    return this.algorithmsService.findBySlug(slug);
  }
}
