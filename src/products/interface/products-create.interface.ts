import { IsDefined, IsNumber } from 'class-validator';

export interface ProductCreateInterface {
  name: string;
  productGroupId: number;
  brandId: number;
}
