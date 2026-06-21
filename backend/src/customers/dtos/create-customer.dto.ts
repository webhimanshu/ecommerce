import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  userId: string;
}
