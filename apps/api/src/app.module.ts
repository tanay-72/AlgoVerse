import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';
import { PrismaModule } from './database/prisma.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AlgorithmsModule } from './modules/algorithms/algorithms.module';
import { ComplexitiesModule } from './modules/complexities/complexities.module';
import { SearchModule } from './modules/search/search.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
    PrismaModule,
    CategoriesModule,
    AlgorithmsModule,
    ComplexitiesModule,
    SearchModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
