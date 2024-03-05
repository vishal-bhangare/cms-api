import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class NewContactDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345 12345',
    required: true,
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'john@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
