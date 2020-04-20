import { IsBoolean, IsDefined, IsNumber, Length } from 'class-validator';

export class ProductUpdateDto {
    @Length(1, 100)
    name: string;

    @IsNumber()
    productGroupId: number;

    @IsNumber()
    brandId: number;
}
