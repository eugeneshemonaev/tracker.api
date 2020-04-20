import { IsDefined, Length } from 'class-validator';

export class ProductGroupCreateDto {
    @IsDefined()
    @Length(1, 255)
    name: string;
}
