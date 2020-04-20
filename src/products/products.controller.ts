import {
    Controller,
    HttpCode, Body,Param,Query,
    Get, Post, Put, Delete,
    UseInterceptors,
    ValidationPipe,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductsQueryDto } from './dto/products-query.dto';
import { ProductCreateDto } from './dto/products-create.dto';
import { ProductUpdateDto } from './dto/products-update.dto';
import { ProductOutputInterface } from './interface/products-output.interface';
import { ProductsListInterface } from './interface/products-list.interface';
import { ProductsService } from './products.service';
import { exceptionFactory } from '../http-exception.filter';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmList(@Query(new ValidationPipe({
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) query: ProductsQueryDto): Promise<ProductsListInterface> {
        return this.productsService.findAll(query);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async rmGet(@Param('id') id: number): Promise<ProductOutputInterface> {
        return this.productsService.getProduct(id);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmCreate(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) data: ProductCreateDto): Promise<ProductOutputInterface> {
        return this.productsService.create(data);
    }

    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async rmUpdate(@Param('id') id: number,
                   @Body(new ValidationPipe({
                       transform: true,
                       whitelist: true,
                       skipMissingProperties: true,
                       forbidNonWhitelisted: true,
                       exceptionFactory,
                   })) data: ProductUpdateDto): Promise<ProductOutputInterface> {
        return this.productsService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(204)
    async rmDelete(@Param('id') id: number): Promise<void> {
        await this.productsService.delete(id);
    }
}
