import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { GetProductsQueryDto } from './dtos/get-products-query.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  getAllProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.getAllProducts(query);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const result = await this.productService.updateProductById(id, dto);
    return { message: 'Product updated successfully', data: result };
  }

  @Delete(':id')
  async softDeleteProductById(@Param('id') id: string) {
    const result = await this.productService.softDeleteProductById(id);
    return { message: 'Product soft deleted successfully', data: result };
  }

  @Patch(':id/restore')
  async restoreProductById(@Param('id') id: string) {
    const result = await this.productService.restoreProductById(id);
    return { message: 'Product restored successfully', data: result };
  }
}
