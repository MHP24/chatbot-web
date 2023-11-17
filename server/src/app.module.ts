// Config
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema, appConfig } from './common/config';

// Cache setup
import { RedisModule } from './providers/cache/redis.module';

// Gateway (WebSocket)
import { ChatModule } from './chat/chat.module';

// Flows
import { BotModule } from './flows/bot/bot.module';
import { AgentModule } from './flows/agent/agent.module';
import { SurveyModule } from './flows/survey/survey.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
    }),
    RedisModule,
    ChatModule,
    BotModule,
    AgentModule,
    SurveyModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
