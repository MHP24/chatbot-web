import { Module } from '@nestjs/common';
import { GenerateIdAdapter } from './adapters';

@Module({
  providers: [GenerateIdAdapter],
  exports: [GenerateIdAdapter],
})
export class CommonModule {}
