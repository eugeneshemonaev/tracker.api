import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Brand } from './brands.entity';
import { BrandsListInterface } from './interface/brands-list.interface';
import { BrandCreateInterface } from './interface/brands-create.interface';
import { BrandOutputInterface } from './interface/brands-output.interface';
import { BrandUpdateInterface } from './interface/brands-update.interface';
import { plainToClassFromExist } from 'class-transformer';
import { BrandsQuery } from './interface/brands-query.interface';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
    ) {}

    async findAll(options: BrandsQuery = {}): Promise<BrandsListInterface> {
        const queryParams: Array<string | Array<string> | boolean | number | Date> = [];
        let text = '';
        let sort: string;

        if (options.text) {
            queryParams.push(`%${options.text}%`);
            text = `AND 
                        (TO_CHAR(id, '999999') ILIKE $${queryParams.length}
                        OR "name" ILIKE $${queryParams.length})`;
        }

        if (options.sort) {
            sort = 'ORDER BY ';
            const [field, direct] = options.sort.split('.');
            if (!direct) {
                throw new BadRequestException({
                    code: 'VF-C0001',
                    message: 'Sort direction is not specified',
                });
            }

            const direction = direct.toUpperCase();
            if (direction !== 'ASC' && direction !== 'DESC') {
                throw new BadRequestException(
                    {
                        code: 'VF-C0002',
                        message: 'Sort direction must be ASC or DESC',
                    });
            }

            switch (field) {
                case 'id':
                    sort += `id ${direction}`;
                    break;
                case 'name':
                    sort += `"name" ${direction}`;
                    break;
                default:
                    sort += '"name"';
            }
        } else {
            sort = 'ORDER BY "name"';
        }

        let offset = options.offset ? Number(options.offset) : 0;
        let limit = 10;
        if (options.limit) {
            limit = options.limit > 1000 ? 1000 : Number(options.limit);
        }
        if (options.all === 'true') {
            limit = 0;
            offset= 0;
        }

        const [result] = await getManager().query(
            `SELECT
                        COALESCE(b.brands, JSON_BUILD_ARRAY()) AS brands,
                        JSON_BUILD_OBJECT( 
                            'limit', ${limit ? limit : 'b."count"'},
                            'offset',${offset},
                            'total', b."count") AS meta 
                    FROM
                        (SELECT
                            JSON_AGG(b) AS brands,
                            COUNT(b.id) 
                        FROM
                            (SELECT
                                id,
                                "name"
                            FROM
                                brands 
                            ${text} 
                            ${sort}
                            ${limit ? `  LIMIT ${limit}` : ''} 
                            ${offset ? `OFFSET ${offset}` : ''}) AS b) AS b`,
            queryParams);

        return result;
    }

    async findOne(id: number): Promise<Brand> {
        const result = await this.brandRepository.findOne(id);
        if (!result) {
            throw new NotFoundException({
                code: 'VF-C0003',
                message: `Brand with id = ${id} not found`,
                meta: { id },
            });
        }

        return result;
    }

    async create(data: BrandCreateInterface): Promise<BrandOutputInterface> {
        const brand = this.brandRepository.create(data);

        const savedBrand = await this.brandRepository.save(brand);

        return this.getBrand(savedBrand.id);
    }

    async update(id: number, data: BrandUpdateInterface): Promise<BrandOutputInterface> {
        const brand = await this.findOne(id);

        plainToClassFromExist(brand, data);

        await this.brandRepository.save(brand);

        return this.getBrand(brand.id);
    }

    async delete(id: number): Promise<void> {
        const brand = await this.findOne(id);

        await this.brandRepository.remove(brand);
    }

    async getBrand(id: number): Promise<BrandOutputInterface> {
        return await this.findOne(id);
    }
}
