import { IsEmail, IsNotEmpty } from "class-validator";

export class NewUserDto {
  @IsNotEmpty()
  name:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  password:string;

  @IsNotEmpty()
  confirmPassword:string;
}