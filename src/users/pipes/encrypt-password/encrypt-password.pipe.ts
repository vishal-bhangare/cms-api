import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { generateHash } from 'src/utils/hash';

@Injectable()
export class EncryptPasswordPipe implements PipeTransform {
  transform(value: NewUserDto, metadata: ArgumentMetadata) {
  
    const encryptedPassword = generateHash(value.password)
    return { ...value, password: encryptedPassword };
  }
}
