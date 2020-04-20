import { IsDefined, Length } from 'class-validator';

export class BrandCreateDto {
    @IsDefined()
    @Length(1, 255)
    name: string;
}
