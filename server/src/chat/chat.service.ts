import { Injectable } from '@nestjs/common';
import { GenerateIdAdapter } from 'src/common/adapters';
// import { Socket } from 'socket.io';
import { RedisService } from 'src/providers/cache/redis.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly redisService: RedisService,
    private readonly generateId: GenerateIdAdapter,
  ) {}

  // Listeners
  async onConnect(sessionId: string) {
    // TODO: add session resource

    const session = await this.redisService.get(`sessions:${sessionId}`);
    if (!session) return this.generateId.generate();

    // TODO: get data from redisService.getJson

    return true; //TODO: => session data
  }

  onDisconnect() {}
  onMessage() {}
  onSurvey() {}

  // Emitters
  emitSessionLoad() {
    // TODO: Params, client (socket), data: T
    // TODO: emit
  }

  // socket, uuid
  emitSession() {}

  // Interactions
  emitMessage() {}
  emitTransfer() {}
  emitClose() {}
}
