import { Body, Controller, Delete, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { deleteUserDto } from 'src/users/dtos/deleteUser.dto';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { UserLoginDto } from 'src/users/dtos/userLogin.dto';
import { AuthGuard } from 'src/users/guards/auth-guard/auth.guard';
import { ConfirmPasswordPipe } from 'src/users/pipes/confirm-password/confirm-password.pipe';
import { EncryptPasswordPipe } from 'src/users/pipes/encrypt-password/encrypt-password.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/signup')
  signUp(
    @Body(ConfirmPasswordPipe, EncryptPasswordPipe) newUserDto: NewUserDto,
  ) {
    return this.userService.createUser(newUserDto);
  }

  @Post('/login')
  login(@Body() loginData: UserLoginDto) {
    return this.userService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @Delete("")
  deleteUser(@Body() {email}:deleteUserDto){
    return this.userService.deleteUser(email);
  }
}
