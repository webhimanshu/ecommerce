import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { GetProductsQueryDto } from './dtos/get-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    return await this.repo.save(product);
  }

  async getAllProducts(query: GetProductsQueryDto) {
    const { page = 1, limit = 10, title, category, sortBy, order } = query;

    const queryBuilder = this.repo.createQueryBuilder('product');

    if (title) {
      queryBuilder.andWhere('LOWER(product.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    queryBuilder.orderBy(`product.${sortBy || 'createdAt'}`, order || 'DESC');

    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      queryBuilder.skip(skip).take(Number(limit));
    }
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
    };
  }

  async getProductById(id: string) {
    const product = await this.repo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProductById(id: string, dto: UpdateProductDto) {
    const product = await this.repo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, dto);

    return await this.repo.save(product);
  }

  async softDeleteProductById(id: string) {
    await this.repo.findOneBy({ id });

    return await this.repo.softDelete(id);
  }

  async restoreProductById(id: string) {
    await this.repo.findOneBy({ id });

    return await this.repo.restore(id);
  }
}
