import { Injectable } from '@nestjs/common';
import type { ComplexityReference } from '@algoverse/shared-types';
import { ComplexitiesRepository } from './complexities.repository';

@Injectable()
export class ComplexitiesService {
  constructor(private readonly complexitiesRepository: ComplexitiesRepository) {}

  async findAll(): Promise<ComplexityReference[]> {
    const references = await this.complexitiesRepository.findAll();

    return references.map((reference) => ({
      id: reference.id,
      notation: reference.notation,
      name: reference.name,
      description: reference.description,
      example: reference.example,
      order: reference.order,
    }));
  }
}
