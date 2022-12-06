import {
  Controller,
  Post,
  Delete,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtPayload } from 'src/auth/types/auth.types';
import { User } from './decorator/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(Number(id));
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  async updateUser(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return await this.userService.updateUser(Number(id), dto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(Number(id));
  }

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }
}
