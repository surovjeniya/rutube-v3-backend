import { UserEntity } from 'src/user/entity/user.entity';
import { Base } from 'src/utils/base.utils';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'Subscription' })
export class SubscriptionEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'from_user_id' })
  from: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  @JoinColumn({ name: 'to_user_id' })
  to: UserEntity;
}
