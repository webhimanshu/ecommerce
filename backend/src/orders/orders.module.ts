import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [CustomersModule, TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
