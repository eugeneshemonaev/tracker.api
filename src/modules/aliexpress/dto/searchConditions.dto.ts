import { SortTypes } from '../../../common/enums/sort-types.enum';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchConditionsDto {
  @IsString()
  searchText: string;

  @IsInt()
  @IsOptional()
  @Transform((val) => Number(val))
  minPrice?: number;

  @IsInt()
  @IsOptional()
  @Transform((val) => Number(val))
  maxPrice?: number;

  @IsBoolean()
  @IsOptional()
  @Transform((val) => val === 'true')
  freeShipping?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform((val) => val === 'true')
  isFavorite?: boolean;

  @IsEnum(SortTypes)
  @IsOptional()
  sortType?: SortTypes;
}
