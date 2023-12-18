import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class NewUserDto {
  @IsNotEmpty()
  name:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must have atleast 4 characters.' })
  password:string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must have atleast 4 characters.' })
  confirmPassword:string;
}