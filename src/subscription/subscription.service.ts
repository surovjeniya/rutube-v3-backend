import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entity/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    private userService: UserService,
  ) {}

  async subscribe(from: number, to: number) {
    const toUser = await this.userService.getUserById(to);
    if (!toUser) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const subscriptionData = {
      from: { id: from },
      to: { id: to },
    };
    const isSub = await this.subscriptionRepository.findOneBy(subscriptionData);
    if (!isSub) {
      const subscription = this.subscriptionRepository.create(subscriptionData);
      await this.subscriptionRepository.save(subscription);
      return true;
    } else {
      await this.subscriptionRepository.delete(subscriptionData);
      return false;
    }
  }
}
