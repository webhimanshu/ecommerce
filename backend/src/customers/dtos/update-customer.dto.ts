import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId?: string;
}
