import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({status: 200, type: CreateUserDTO})
  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    return this.usersService.createUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JwtAuthGuard)
  @Patch('update-user')
  updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user
    return this.usersService.updateUser(user.email, updateDto)
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: DeleteUserDTO})
  @UseGuards(JwtAuthGuard)
  @Delete('delete-user')
  deleteUser(@Req() request): Promise<boolean> {
    const {email} = request.user
    return this.usersService.deleteUser(email);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: CreateUserDTO})
  @Get('get-users')
  getUsers() {
    return this.usersService.getUsers();
  }
}
