import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum productCategory {
  ELECTRONICS = 'electronics',
  FASHION = 'fashion',
  HOME = 'home',
  BEAUTY = 'beauty',
  SPORTS = 'sports',
  TOYS = 'toys',
  BOOKS = 'books',
  MUSIC = 'music',
  GROCERY = 'grocery',
  PETS = 'pets',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    default: 0,
  })
  stock: number;

  @Column({
    type: 'enum',
    enum: productCategory,
  })
  category: productCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
