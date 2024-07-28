import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { OutputsModule } from './outputs/outputs.module';
import { RedisModule } from '../cache/redis.module';
import {
  EntriesFactory,
  InputService,
  OptionService,
} from './factories/entries';

@Module({
  providers: [BotService, EntriesFactory, InputService, OptionService],
  exports: [BotService],
  imports: [RedisModule, OutputsModule],
})
export class BotModule {}
