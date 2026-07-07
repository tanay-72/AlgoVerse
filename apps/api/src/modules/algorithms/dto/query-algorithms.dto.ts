import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Difficulty } from '@algoverse/shared-types';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class QueryAlgorithmsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsString()
  tag?: string;
}
