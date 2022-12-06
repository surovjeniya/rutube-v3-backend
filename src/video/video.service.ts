import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/types/auth.types';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entity/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async createVideo(
    { description, name }: CreateVideoDto,
    { user: { id, email } }: JwtPayload,
  ): Promise<VideoEntity> {
    const videoData = {
      name,
      description,
    };
    const video = this.videoRepository.create({
      ...videoData,
      user: { id, email },
    });
    return await this.videoRepository.save(video);
  }

  async verifyAuthor(id: number) {
    const isVefiry = await this.videoRepository.findOneBy({
      user: { id },
    });
    if (!isVefiry) {
      return false;
    } else {
      return true;
    }
  }

  async updateVideo(
    id: number,
    user: JwtPayload,
    dto: UpdateVideoDto,
  ): Promise<VideoEntity> {
    const video = await this.getVideoById(id);
    if (!video) {
      throw new HttpException('Видео не найдено', HttpStatus.NOT_FOUND);
    }
    const isVefiry = await this.verifyAuthor(user.user.id);
    if (!isVefiry) {
      throw new HttpException(
        'Вы не можете изменять не свои видео',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.videoRepository.save({ ...video, ...dto });
  }

  async deleteVideo(id: number, user: JwtPayload) {
    const video = await this.getVideoById(id);
    if (!video) {
      throw new HttpException('Видео не найдено', HttpStatus.NOT_FOUND);
    }
    const verifyAuthor = await this.videoRepository.findOneBy({
      user: { id: user.user.id },
    });
    if (!verifyAuthor) {
      throw new HttpException(
        'Вы не можете удалять не свои видео',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.videoRepository.delete(video.id);
    return {
      message: `Видео ${video.name} удалено`,
    };
  }

  async getVideoById(id: number): Promise<VideoEntity> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: {
        user: true,
        likes: true,
        comments: true,
      },
    });
    return video;
  }
}
