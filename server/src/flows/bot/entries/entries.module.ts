import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { InputService, OptionService } from './handlers';

@Module({
  providers: [EntriesService, InputService, OptionService],
  exports: [EntriesService],
})
export class EntriesModule {}
