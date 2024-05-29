import { Module } from '@nestjs/common';
import { RedisModule } from '../../cache/redis.module';
import { EntriesService } from './entries.service';
import { InputService, OptionService } from './handlers';

@Module({
  providers: [EntriesService, InputService, OptionService],
  exports: [EntriesService],
  imports: [RedisModule],
})
export class EntriesModule {}
