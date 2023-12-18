import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { verifyHash } from 'src/utils/hash';
import { UserData, loginData } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  getAllUsers() {
    return this.usersRepo.find({ relations: ['contacts'] });
  }

  async createUser(userData: UserData) {
    const user = await this.usersRepo.findOneBy({ email: userData.email });
    if (user)
      throw new HttpException(
        'Email already exists, use another.',
        HttpStatus.BAD_REQUEST,
      );
    const res = await this.usersRepo.save(userData);
    const payload = {
      user: { id: res.id, name: res.name, email: res.email },
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginData: loginData) {
    const user = await this.usersRepo.findOneBy({ email: loginData.email });
    if (!verifyHash(loginData.password, user.password))
      throw new UnauthorizedException();
    const payload = {
      user: { id: user.id, name: user.name, email: user.email },
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async deleteUser(email: string) {
    const res = await this.usersRepo.delete({ email: email });
    if (res.affected)
      return { msg: 'user deleted successfullly.', status: HttpStatus.OK };
    else return { msg: 'user not found.', status: HttpStatus.BAD_REQUEST };
  }
}
