import { BadRequestException, Injectable } from '@nestjs/common';
//import { users } from '../../moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }

  
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, {where: {email}})
    return dto
  }

  async deleteUser(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email)
    return await this.userRepository.destroy({where: {email}}).then((u) => { return true });
  }


  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll({
        attributes: { exclude: ['password'] },
      });
      return users;
    } catch (e) {
      throw new Error(e);
    }
  }
}
