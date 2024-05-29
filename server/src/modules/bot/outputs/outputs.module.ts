import { Module } from '@nestjs/common';
import { RedisModule } from '../../cache/redis.module';
import { OutputsService } from './outputs.service';
import { ActionService, CloseService, TransferService } from './handlers';

@Module({
  providers: [OutputsService, ActionService, CloseService, TransferService],
  exports: [OutputsService],
  imports: [RedisModule],
})
export class OutputsModule {}
