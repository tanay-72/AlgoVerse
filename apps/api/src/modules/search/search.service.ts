import { Injectable } from '@nestjs/common';
import type { AlgorithmSummary } from '@algoverse/shared-types';
import { AlgorithmMapper } from '../algorithms/mappers/algorithm.mapper';
import { buildPaginatedResult, PaginatedResult } from '../../common/utils/paginate';
import { SearchRepository } from './search.repository';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async search(query: SearchQueryDto): Promise<PaginatedResult<AlgorithmSummary>> {
    const { items, total } = await this.searchRepository.search(query);

    return buildPaginatedResult(
      items.map(AlgorithmMapper.toSummary),
      total,
      query.page,
      query.pageSize,
    );
  }
}
