import { IsBooleanString, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ProductsQueryDto {
    @IsBooleanString()
    all: string;

    @IsNotEmpty()
    text: string;

    @IsString()
    sort: string;

    @IsNumberString()
    limit: number;

    @IsNumberString()
    offset: number;
}
