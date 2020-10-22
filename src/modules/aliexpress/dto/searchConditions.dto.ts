import { SortTypes } from '../../../common/enums/sort-types.enum';
import { IsEnum, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class SearchConditionsDto {
  @IsString()
  searchText: string;

  @IsInt()
  @IsOptional()
  minPrice?: number;

  @IsInt()
  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsIn(['y', 'n'])
  @IsOptional()
  freeShipping?: string;

  @IsString()
  @IsIn(['y', 'n'])
  @IsOptional()
  isFavorite?: string;

  @IsEnum(SortTypes)
  @IsOptional()
  sortType?: SortTypes;
}
