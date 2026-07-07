import { Controller, Get } from '@nestjs/common';
import type { ComplexityReference } from '@algoverse/shared-types';
import { ComplexitiesService } from './complexities.service';

@Controller('complexities')
export class ComplexitiesController {
  constructor(private readonly complexitiesService: ComplexitiesService) {}

  @Get()
  findAll(): Promise<ComplexityReference[]> {
    return this.complexitiesService.findAll();
  }
}
