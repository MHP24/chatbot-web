import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { RedisModule } from 'src/providers/cache/redis.module';
import { EntriesModule } from './entries/entries.module';
import { OutputsModule } from './outputs/outputs.module';

@Module({
  providers: [BotService],
  exports: [BotService],
  imports: [ConfigModule, RedisModule, EntriesModule, OutputsModule],
})
export class BotModule {}
