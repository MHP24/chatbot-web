import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { InputService, OptionService } from './handlers';
import { RedisModule } from 'src/providers/cache/redis.module';

@Module({
  providers: [EntriesService, InputService, OptionService],
  exports: [EntriesService],
  imports: [RedisModule],
})
export class EntriesModule {}
