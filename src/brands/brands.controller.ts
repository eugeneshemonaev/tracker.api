import {
    Controller,
    HttpCode, Body,Param,Query,
    Get, Post, Put, Delete,
    UseInterceptors,
    ValidationPipe,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { BrandsQueryDto } from './dto/brands-query.dto';
import { BrandCreateDto } from './dto/brands-create.dto';
import { BrandUpdateDto } from './dto/brands-update.dto';
import { BrandOutputInterface } from './interface/brands-output.interface';
import { BrandsListInterface } from './interface/brands-list.interface';
import { BrandsService } from './brands.service';
import { exceptionFactory } from '../http-exception.filter';

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmList(@Query(new ValidationPipe({
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) query: BrandsQueryDto): Promise<BrandsListInterface> {
        return this.brandsService.findAll(query);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async rmGet(@Param('id') id: number): Promise<BrandOutputInterface> {
        return this.brandsService.getBrand(id);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async rmCreate(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
        skipMissingProperties: true,
        forbidNonWhitelisted: true,
        exceptionFactory,
    })) data: BrandCreateDto): Promise<BrandOutputInterface> {
        return this.brandsService.create(data);
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
                   })) data: BrandUpdateDto): Promise<BrandOutputInterface> {
        return this.brandsService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(204)
    async rmDelete(@Param('id') id: number): Promise<void> {
        await this.brandsService.delete(id);
    }
}
