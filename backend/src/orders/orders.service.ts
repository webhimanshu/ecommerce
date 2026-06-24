import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomersService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const customer = await this.customerService.findOne(
      createOrderDto.customerId,
    );

    if (!customer) {
      throw new Error('Customer not found');
    }

    const newOrder = this.orderRepository.create({
      customer,
      status: OrderStatus.PENDING,
    });

    return this.orderRepository.save(newOrder);
  }

  async getAllOrders() {
    return this.orderRepository.find({
      relations: {
        customer: true,
      },
    });
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.getOrderById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status as OrderStatus;

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: string) {
    const order = await this.getOrderById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.softDelete(id);
  }

  async restoreOrder(id: string) {
    const order = await this.getOrderById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.restore(id);
  }
}
