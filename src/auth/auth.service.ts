import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthResponse, JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateToken(user: UserEntity): Promise<string> {
    delete user.password;
    const payload: JwtPayload = {
      user,
    };
    return await this.jwtService.signAsync(payload);
  }

  async login(dto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('Неверный email', HttpStatus.BAD_REQUEST);
    }
    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }
    const token = await this.generateToken(user);
    return {
      token,
      user: {
        email: user.email,
      },
    };
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync(token);
  }

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Такой email уже используется',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser(dto);
    const token = await this.generateToken(user);
    return {
      token,
      user: {
        email: user.email,
      },
    };
  }
}
