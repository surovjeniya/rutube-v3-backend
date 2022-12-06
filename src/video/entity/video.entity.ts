import { CommentEntity } from 'src/comment/entity/comment.entity';
import { LikeEntity } from 'src/like/entity/like.enity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Base } from 'src/utils/base.utils';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'Video' })
export class VideoEntity extends Base {
  @Column({ default: '' })
  name: string;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '' })
  videoPath: string;

  @Column({ default: '' })
  avatarPath: string;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ default: 0 })
  likesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.video)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.video)
  likes: LikeEntity[];
}
