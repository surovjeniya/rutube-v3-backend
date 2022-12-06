import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/types/auth.types';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './entity/dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(
    dto: CreateCommentDto,
    { user }: JwtPayload,
    video: number,
  ): Promise<CommentEntity> {
    const comment = this.commentRepository.create({
      message: dto.message,
      video: { id: video },
      user: { id: user.id },
    });
    return await this.commentRepository.save(comment);
  }
}
