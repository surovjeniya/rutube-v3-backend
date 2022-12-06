import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entity/video.entity';
import { UserModule } from 'src/user/user.module';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { LikeEntity } from 'src/like/entity/like.enity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoEntity,
      CommentEntity,
      UserEntity,
      LikeEntity,
    ]),
    UserModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
