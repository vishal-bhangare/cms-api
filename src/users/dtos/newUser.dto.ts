import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class NewUserDto {
  @ApiProperty({
    name: 'name',
    example: 'Your Name',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    example: 'john@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'yourpassword',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(4, { message: 'Password must have atleast 4 characters.' })
  password: string;

  @ApiProperty({
    name: 'confirmPassword',
    example: 'yourpassword',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(4, { message: 'Password must have atleast 4 characters.' })
  confirmPassword: string;
}
