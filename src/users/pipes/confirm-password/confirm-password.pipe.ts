import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { NewUserDto } from 'src/users/dtos/newUser.dto';

@Injectable()
export class ConfirmPasswordPipe implements PipeTransform {
  transform(value: NewUserDto, metadata: ArgumentMetadata) {
    if(value.password !== value.confirmPassword)
    throw new HttpException(
      'Password did not matched.',
      HttpStatus.BAD_REQUEST,
    );
    return value;
  }
}
