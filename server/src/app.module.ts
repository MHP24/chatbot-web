// * Config
import { Module } from '@nestjs/common';

// * Database providers modules
import { RedisModule } from './modules/cache/redis.module';
import { PrismaModule } from './modules/prisma/prisma.module';

// * Gateway (WebSocket)
import { ChatModule } from './modules/chat/chat.module';

// * Flows
import { BotModule } from './modules/bot/bot.module';

// * Rest
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [RedisModule, PrismaModule, ChatModule, BotModule, FilesModule],
})
export class AppModule {}
