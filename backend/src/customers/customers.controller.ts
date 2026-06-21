import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Get()
  fetchAll() {
    return this.customerService.getAllCustomers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  softDelete(@Param(':id') id: string) {
    return this.customerService.softDelete(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.customerService.restore(id);
  }
}
