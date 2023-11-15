// Config
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema, appConfig } from './common/config';

// Gateway (WebSocket)
import { ChatModule } from './chat/chat.module';

// Flows
import { BotModule } from './flows/bot/bot.module';
import { AgentModule } from './flows/agent/agent.module';
import { SurveyModule } from './flows/survey/survey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
    }),
    ChatModule,
    BotModule,
    AgentModule,
    SurveyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
