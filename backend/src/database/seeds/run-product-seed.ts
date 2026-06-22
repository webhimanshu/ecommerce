import { AppDataSource } from '../data-source';
import { seedProducts } from './product.seed';

async function run() {
  try {
    await AppDataSource.initialize();

    await seedProducts(AppDataSource);

    await AppDataSource.destroy();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
