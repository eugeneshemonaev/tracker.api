import {
    Controller,
    HttpCode, Body,Param,Query,
    Get, Post, Put, Delete,
    UseInterceptors,
    ValidationPipe,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductGroupsQueryDto } from './dto/product-groups-query.dto';
import { ProductGroupCreateDto } from './dto/product-groups-create.dto';
import { ProductGroupUpdateDto } from './dto/product-groups-update.dto';
import { ProductGroupOutputInterface } from './interface/product-groups-output.interface';
import { ProductGroupsListInterface } from './interface/product-groups-list.interface';
import { ProductGroupsService } from './product-groups.service';
import { exceptionFactory } from '../http-exception.filter';

@Controller('product-groups')
export class ProductGroupsController {
    constructor(private readonly productGroupsService: ProductGroupsService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmList(@Query(new ValidationPipe({
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) query: ProductGroupsQueryDto): Promise<ProductGroupsListInterface> {
        return this.productGroupsService.findAll(query);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async rmGet(@Param('id') id: number): Promise<ProductGroupOutputInterface> {
        return this.productGroupsService.getProductGroup(id);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmCreate(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) data: ProductGroupCreateDto): Promise<ProductGroupOutputInterface> {
        return this.productGroupsService.create(data);
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
                   })) data: ProductGroupUpdateDto): Promise<ProductGroupOutputInterface> {
        return this.productGroupsService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(204)
    async rmDelete(@Param('id') id: number): Promise<void> {
        await this.productGroupsService.delete(id);
    }
}
