import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { RedisModule } from '../cache/redis.module';
import {
  EntriesFactory,
  InputService,
  OptionService,
} from './factories/entries';
import {
  ActionService,
  CloseService,
  OutputsFactory,
} from './factories/outputs';

@Module({
  providers: [
    BotService,
    EntriesFactory,
    InputService,
    OptionService,
    OutputsFactory,
    ActionService,
    CloseService,
  ],
  exports: [BotService],
  imports: [RedisModule],
})
export class BotModule {}
