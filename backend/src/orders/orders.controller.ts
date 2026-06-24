import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Patch(':id/restore')
  restoreOrder(@Param('id') id: string) {
    return this.ordersService.restoreOrder(id);
  }
}
