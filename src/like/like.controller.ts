import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtPayload } from 'src/auth/types/auth.types';
import { User } from 'src/user/decorator/user.decorator';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Patch(':video')
  @UseGuards(new AuthGuard())
  async likeVideo(@Param('video') video: string, @User() user: JwtPayload) {
    return await this.likeService.likeVideo(Number(video), user);
  }
}
