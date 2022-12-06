import { Base } from 'src/utils/base.utils';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { SubscriptionEntity } from 'src/subscription/entity/subscription.entity';
import { VideoEntity } from 'src/video/entity/video.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { LikeEntity } from 'src/like/entity/like.enity';

@Entity({ name: 'User' })
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  name: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  subscribersCount: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 3);
  }

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: '' })
  avatarPath: string;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.from)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.to)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
