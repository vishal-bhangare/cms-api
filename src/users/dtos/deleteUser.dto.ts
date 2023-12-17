import { IsEmail, IsNotEmpty } from "class-validator";

export class deleteUserDto{
  @IsEmail()
  @IsNotEmpty()
  email:string;
}