import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtPayload } from 'src/auth/types/auth.types';
import { User } from 'src/user/decorator/user.decorator';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Put('subscribe/:id')
  @UseGuards(new AuthGuard())
  async subscribe(@User() user: JwtPayload, @Param('id') id: string) {
    return await this.subscriptionService.subscribe(user.user.id, Number(id));
  }
}
