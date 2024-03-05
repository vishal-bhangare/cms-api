import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { deleteUserDto } from 'src/users/dtos/deleteUser.dto';
import { NewUserDto } from 'src/users/dtos/newUser.dto';
import { UserLoginDto } from 'src/users/dtos/userLogin.dto';
import { AuthGuard } from 'src/users/guards/auth-guard/auth.guard';
import { ConfirmPasswordPipe } from 'src/users/pipes/confirm-password/confirm-password.pipe';
import { EncryptPasswordPipe } from 'src/users/pipes/encrypt-password/encrypt-password.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('Users')
@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of All users',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: NewUserDto,
    description: 'Request body for creating new contact',
  })
  signUp(
    @Body(ConfirmPasswordPipe, EncryptPasswordPipe) newUserDto: NewUserDto,
  ) {
    return this.userService.createUser(newUserDto);
  }

  @Post('/login')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: UserLoginDto,
    description: 'Request body for creating new contact',
  })
  login(@Body() loginData: UserLoginDto) {
    return this.userService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: deleteUserDto,
    description: 'Request body for creating new contact',
  })
  deleteUser(@Body() { email }: deleteUserDto) {
    return this.userService.deleteUser(email);
  }
}
