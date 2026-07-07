import { Controller, Get, Query } from '@nestjs/common';
import type { AlgorithmSummary } from '@algoverse/shared-types';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { PaginatedResult } from '../../common/utils/paginate';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() query: SearchQueryDto): Promise<PaginatedResult<AlgorithmSummary>> {
    return this.searchService.search(query);
  }
}
