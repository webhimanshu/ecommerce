import { faker } from '@faker-js/faker';
import {
  Product,
  productCategory,
} from 'src/products/entities/product.entities';
import { DataSource } from 'typeorm';

const categories = [
  'electronics',
  'fashion',
  'home',
  'beauty',
  'sports',
  'toys',
  'books',
  'music',
  'grocery',
  'pets',
];

const batchSize = 100;

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository('products');

  const products: Partial<Product>[] = [];

  for (let i = 0; i < 1000; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(
        faker.commerce.price({
          min: 100,
          max: 100000,
        }),
      ),
      stock: faker.number.int({
        min: 0,
        max: 500,
      }),
      category: faker.helpers.arrayElement(categories) as productCategory,
    });
  }

  for (let i = 0; i < products.length; i += batchSize) {
    await productRepository.insert(products.slice(i, i + batchSize));
  }

  console.log('✅ Products seeded successfully');
}
