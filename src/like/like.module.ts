import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entity/like.enity';
import { UserEntity } from 'src/user/entity/user.entity';
import { VideoEntity } from 'src/video/entity/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, UserEntity, VideoEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
