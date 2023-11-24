import { Module } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { ActionService, CloseService, TransferService } from './handlers';

@Module({
  providers: [OutputsService, ActionService, CloseService, TransferService],
  exports: [OutputsService],
})
export class OutputsModule {}
