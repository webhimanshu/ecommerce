import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
    private userService: UsersService,
  ) {}

  async create(dto: CreateCustomerDto) {
    const user = await this.userService.findById(dto.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCustomer = this.repo.create({
      phoneNumber: dto.phoneNumber,
      user,
    });

    return this.repo.save(newCustomer);
  }

  async getAllCustomers() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const customer = await this.repo.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    Object.assign(customer, dto);

    return this.repo.save(customer);
  }

  async softDelete(id: string) {
    await this.findOne(id);

    return this.repo.softDelete(id);
  }

  async restore(id: string) {
    return this.repo.restore(id);
  }
}
