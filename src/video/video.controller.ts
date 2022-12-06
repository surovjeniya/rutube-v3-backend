import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtPayload } from 'src/auth/types/auth.types';
import { User } from 'src/user/decorator/user.decorator';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('create')
  @UseGuards(new AuthGuard())
  async createVideo(@Body() dto: CreateVideoDto, @User() user: JwtPayload) {
    return await this.videoService.createVideo(dto, user);
  }

  @Get(':id')
  async getVideoById(@Param('id') id: number) {
    return await this.videoService.getVideoById(Number(id));
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async deleteVideo(@Param('id') id: string, @User() user: JwtPayload) {
    return await this.videoService.deleteVideo(Number(id), user);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  async updateVideo(
    @Param('id') id: string,
    @User() user: JwtPayload,
    @Body() dto: UpdateVideoDto,
  ) {
    return await this.videoService.updateVideo(Number(id), user, dto);
  }
}
