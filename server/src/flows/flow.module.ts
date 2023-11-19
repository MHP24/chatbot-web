import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { BotModule } from './bot/bot.module';

@Module({
  providers: [FlowService],
  exports: [FlowService],
  imports: [BotModule],
})
export class FlowModule {}
