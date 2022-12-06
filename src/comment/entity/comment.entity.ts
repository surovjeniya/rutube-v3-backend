import { UserEntity } from 'src/user/entity/user.entity';
import { Base } from 'src/utils/base.utils';
import { VideoEntity } from 'src/video/entity/video.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Comment' })
export class CommentEntity extends Base {
  @Column()
  message: string;

  @ManyToOne(() => VideoEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
