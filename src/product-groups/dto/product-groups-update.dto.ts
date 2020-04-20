import { Length } from 'class-validator';

export class ProductGroupUpdateDto {
    @Length(1, 255)
    name: string;
}
