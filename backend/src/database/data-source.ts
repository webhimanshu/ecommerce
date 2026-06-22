import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entities';
import { Order } from 'src/orders/entities/order.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,

  entities: [User, Customer, Product, Order],

  synchronize: false,
});
