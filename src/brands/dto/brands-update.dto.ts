import { Length } from 'class-validator';

export class BrandUpdateDto {
    @Length(1, 255)
    name: string;
}
