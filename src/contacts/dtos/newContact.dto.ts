import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class NewContactDto {

  @IsNotEmpty()
  @IsNumber()
  userId:number

  @IsNotEmpty()
  name:string;

  @IsNotEmpty()
  phone:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

}