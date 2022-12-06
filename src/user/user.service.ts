import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { JwtPayload } from 'src/auth/types/auth.types';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<{ message: string } | boolean> {
    const user = await this.getUserById(id);
    if (!user) {
      return false;
    } else {
      await this.userRepository.delete(id);
      return {
        message: 'Пользователь ' + user.email + ' удалён',
      };
    }
  }

  async updateUser(
    id: number,
    dto: UpdateUserDto,
  ): Promise<UserEntity | boolean> {
    const user = await this.getUserById(id);
    if (!user) {
      return false;
    } else {
      return await this.userRepository.save({ ...user, ...dto });
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        subscribers: true,
        subscriptions: true,
      },
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
