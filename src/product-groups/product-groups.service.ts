import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { ProductGroup } from './product-groups.entity';
import { ProductGroupsListInterface } from './interface/product-groups-list.interface';
import { ProductGroupCreateInterface } from './interface/product-groups-create.interface';
import { ProductGroupOutputInterface } from './interface/product-groups-output.interface';
import { ProductGroupUpdateInterface } from './interface/product-groups-update.interface';
import { ProductGroupsQuery } from './interface/product-groups-query.interface';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class ProductGroupsService {
    constructor(
        @InjectRepository(ProductGroup)
        private readonly productGroupRepository: Repository<ProductGroup>,
    ) {}

    async findAll(options: ProductGroupsQuery = {}): Promise<ProductGroupsListInterface> {
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
                        COALESCE(pg.productGroups, JSON_BUILD_ARRAY()) AS productGroups,
                        JSON_BUILD_OBJECT( 
                            'limit', ${limit ? limit : 'pg."count"'},
                            'offset',${offset},
                            'total', pg."count") AS meta 
                    FROM
                        (SELECT
                            JSON_AGG(pg) AS productGroups,
                            COUNT(pg.id) 
                        FROM
                            (SELECT
                                id,
                                "name"
                            FROM
                                product_groups 
                            ${text} 
                            ${sort}
                            ${limit ? `  LIMIT ${limit}` : ''} 
                            ${offset ? `OFFSET ${offset}` : ''}) AS pg) AS pg`,
            queryParams);

        return result;
    }

    async findOne(id: number): Promise<ProductGroup> {
        const result = await this.productGroupRepository.findOne(id);
        if (!result) {
            throw new NotFoundException({
                code: 'VF-C0003',
                message: `ProductGroup with id = ${id} not found`,
                meta: { id },
            });
        }

        return result;
    }

    async create(data: ProductGroupCreateInterface): Promise<ProductGroupOutputInterface> {
        const productGroup = this.productGroupRepository.create(data);

        const savedProductGroup = await this.productGroupRepository.save(productGroup);

        return this.getProductGroup(savedProductGroup.id);
    }

    async update(id: number, data: ProductGroupUpdateInterface): Promise<ProductGroupOutputInterface> {
        const productGroup = await this.findOne(id);

        plainToClassFromExist(productGroup, data);

        await this.productGroupRepository.save(productGroup);

        return this.getProductGroup(productGroup.id);
    }

    async delete(id: number): Promise<void> {
        const productGroup = await this.findOne(id);

        await this.productGroupRepository.remove(productGroup);
    }

    async getProductGroup(id: number): Promise<ProductGroupOutputInterface> {
        return this.findOne(id);
    }
}
