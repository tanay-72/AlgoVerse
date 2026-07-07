import { Injectable } from '@nestjs/common';
import type { Algorithm, AlgorithmSummary } from '@algoverse/shared-types';
import { buildPaginatedResult, PaginatedResult } from '../../common/utils/paginate';
import { ResourceNotFoundException } from '../../common/exceptions/resource-not-found.exception';
import { AlgorithmsRepository } from './algorithms.repository';
import { AlgorithmMapper } from './mappers/algorithm.mapper';
import { QueryAlgorithmsDto } from './dto/query-algorithms.dto';

@Injectable()
export class AlgorithmsService {
  constructor(private readonly algorithmsRepository: AlgorithmsRepository) {}

  async findMany(query: QueryAlgorithmsDto): Promise<PaginatedResult<AlgorithmSummary>> {
    const { items, total } = await this.algorithmsRepository.findMany(query);

    return buildPaginatedResult(
      items.map(AlgorithmMapper.toSummary),
      total,
      query.page,
      query.pageSize,
    );
  }

  async findBySlug(slug: string): Promise<Algorithm> {
    const algorithm = await this.algorithmsRepository.findBySlug(slug);

    if (!algorithm) {
      throw new ResourceNotFoundException('Algorithm', slug);
    }

    return AlgorithmMapper.toDetail(algorithm);
  }
}
