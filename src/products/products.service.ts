import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Product } from './products.entity';
import { ProductsListInterface } from './interface/products-list.interface';
import { ProductCreateInterface } from './interface/products-create.interface';
import { ProductOutputInterface } from './interface/products-output.interface';
import { ProductUpdateInterface } from './interface/products-update.interface';
import { ProductsQuery } from './interface/products-query.interface';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findAll(options: ProductsQuery = {}): Promise<ProductsListInterface> {
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
                        COALESCE(pg.products, JSON_BUILD_ARRAY()) AS products,
                        JSON_BUILD_OBJECT( 
                            'limit', ${limit ? limit : 'pg."count"'},
                            'offset',${offset},
                            'total', pg."count") AS meta 
                    FROM
                        (SELECT
                            JSON_AGG(pg) AS products,
                            COUNT(pg.id) 
                        FROM
                            (SELECT
                                p.id,
                                p."name",
                                pg."name" AS "productGroupName",
                                b."name" AS "brandName"
                            FROM
                                products AS p
                            LEFT JOIN 
                                product_groups AS pg
                                    ON p."productGroupId" = pg.id
                            LEFT JOIN 
                                brands AS b 
                                    ON p."brandId" = b.id
                            ${text} 
                            ${sort}
                            ${limit ? `  LIMIT ${limit}` : ''} 
                            ${offset ? `OFFSET ${offset}` : ''}) AS pg) AS pg`,
            queryParams);

        return result;
    }

    async findOne(id: number): Promise<Product> {
        const result = await this.productRepository.findOne(id);
        if (!result) {
            throw new NotFoundException({
                code: 'VF-C0003',
                message: `Product with id = ${id} not found`,
                meta: { id },
            });
        }

        return result;
    }

    async create(data: ProductCreateInterface): Promise<ProductOutputInterface> {
        const product = this.productRepository.create(data);

        const savedProduct = await this.productRepository.save(product);

        return this.getProduct(savedProduct.id);
    }

    async update(id: number, data: ProductUpdateInterface): Promise<ProductOutputInterface> {
        const product = await this.findOne(id);

        plainToClassFromExist(product, data);

        await this.productRepository.save(product);

        return this.getProduct(product.id);
    }

    async delete(id: number): Promise<void> {
        const product = await this.findOne(id);

        await this.productRepository.remove(product);
    }

    async getProduct(id: number): Promise<ProductOutputInterface> {
        return this.findOne(id);
    }
}
