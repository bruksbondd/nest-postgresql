import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    console.log(dto)
    return this.usersService.createUser(dto);
  }

  @Get('get-users')
  getUsers() {
    return this.usersService.getUsers();
  }
}
