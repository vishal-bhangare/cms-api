import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateContactDto {
  name:string;
  phone:string;
  email:string;
}