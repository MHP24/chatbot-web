import { Module } from '@nestjs/common';
import { BotClientResponseAdapter, GenerateIdAdapter } from './adapters';

@Module({
  providers: [GenerateIdAdapter, BotClientResponseAdapter],
  exports: [GenerateIdAdapter, BotClientResponseAdapter],
})
export class CommonModule {}
