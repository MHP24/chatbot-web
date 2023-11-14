import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema, appConfig } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
