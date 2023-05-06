import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login( @Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
  @Post('register')
  register( @Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }
}
