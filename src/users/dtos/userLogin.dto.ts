import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
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
  password: string;
}
