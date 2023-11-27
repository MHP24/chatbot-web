import { Module } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { ActionService, CloseService, TransferService } from './handlers';
import { RedisModule } from 'src/providers/cache/redis.module';

@Module({
  providers: [OutputsService, ActionService, CloseService, TransferService],
  exports: [OutputsService],
  imports: [RedisModule],
})
export class OutputsModule {}
