import { UserEntity } from 'src/user/entity/user.entity';
import { Base } from 'src/utils/base.utils';
import { VideoEntity } from 'src/video/entity/video.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Like' })
export class LikeEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.likes)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;
}
