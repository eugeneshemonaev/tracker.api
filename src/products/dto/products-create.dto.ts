import { IsBoolean, IsDefined, IsNumber, Length } from 'class-validator';

export class ProductCreateDto {
    @IsDefined()
    @Length(1, 100)
    name: string;

    @IsDefined()
    @IsNumber()
    productGroupId: number;

    @IsDefined()
    @IsNumber()
    brandId: number;
}
