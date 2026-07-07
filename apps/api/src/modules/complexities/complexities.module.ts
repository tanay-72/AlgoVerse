import { Module } from '@nestjs/common';
import { ComplexitiesController } from './complexities.controller';
import { ComplexitiesService } from './complexities.service';
import { ComplexitiesRepository } from './complexities.repository';

@Module({
  controllers: [ComplexitiesController],
  providers: [ComplexitiesService, ComplexitiesRepository],
})
export class ComplexitiesModule {}
