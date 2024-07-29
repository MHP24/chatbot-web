import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatService) {}

  @Get('request')
  requestChat(@Query('chatId') chatId: string) {
    return this.chatService.handleChatRequest(chatId);
  }
}
