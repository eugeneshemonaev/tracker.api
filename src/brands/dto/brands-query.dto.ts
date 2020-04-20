import { IsBooleanString, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class BrandsQueryDto {
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
