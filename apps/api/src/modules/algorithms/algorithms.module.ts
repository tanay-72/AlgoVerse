import { Module } from '@nestjs/common';
import { AlgorithmsController } from './algorithms.controller';
import { AlgorithmsService } from './algorithms.service';
import { AlgorithmsRepository } from './algorithms.repository';

@Module({
  controllers: [AlgorithmsController],
  providers: [AlgorithmsService, AlgorithmsRepository],
  exports: [AlgorithmsRepository],
})
export class AlgorithmsModule {}
