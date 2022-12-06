import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/types/auth.types';
import { Repository } from 'typeorm';
import { LikeEntity } from './entity/like.enity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  async likeVideo(video: number, user: JwtPayload) {
    const likeData = {
      user: { id: user.user.id },
      video: { id: video },
    };
    const isLikes = await this.likeRepository.findOneBy(likeData);
    if (!isLikes) {
      const like = this.likeRepository.create(likeData);
      await this.likeRepository.save(like);
      return true;
    } else {
      await this.likeRepository.delete(likeData);
      return false;
    }
  }
}
