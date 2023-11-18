import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { GenerateIdAdapter } from '../common/adapters';
import { Chat, Flow, Message } from '../common/types';
import { RedisService } from '../providers/cache/redis.service';
import { FlowService } from 'src/flows/flow.service';
import { BotMessage } from 'src/flows/types';

@Injectable()
export class ChatService {
  logger = new Logger('ChatService');

  constructor(
    // TODO: add session service
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly generateId: GenerateIdAdapter,
    private readonly flowService: FlowService,
  ) {}

  /* Event listeners */
  async onConnect(server: Server, client: Socket, id: string) {
    const session = await this.redisService.getJson<Chat>(`chat:${id}`);

    const room = session?.sessionId ?? this.generateId.generate();
    client.join(room);

    if (session) {
      // TODO: emitLoad
      // this.loadSession(server, room);
      this.logger.log(`${room} loaded`);
      return;
    }

    await this.initializeChat(server, room);

    this.logger.log(`Session ${room} created`);
    return this.emitSession(server, {
      sessionId: room,
      flow: this.configService.get('DEFAULT_FLOW'),
    });
  }

  onDisconnect() {}
  onMessage() {}
  onSurvey() {}

  async initializeChat(server: Server, id: string) {
    const timestamp = Number(new Date());
    const defaultFlow = this.configService.get('DEFAULT_FLOW');

    await this.redisService.setJson<Chat>(`chat:${id}`, {
      sessionId: id,
      startDate: timestamp,
      currentFlow: defaultFlow,
      context: {
        lastUserInteraction: timestamp,
      },
      history: [],
      log: [],
    });

    const defaultMessage: Message = {
      sessionId: id,
      message: {
        type: this.configService.get('DEFAULT_FLOW_KEY_TYPE'),
        data: this.configService.get('DEFAULT_FLOW_KEY'),
      },
      timestamp,
      context: {
        currentFlow: defaultFlow,
      },
    };

    const flowResponse = this.flowService.handleFlow(defaultMessage);
    flowResponse && this.emitMessage(server, id, flowResponse);
  }

  /* Event emitters */
  emitSession(server: Server, context: { sessionId: string; flow: Flow }) {
    return server.to(context.sessionId).emit('session', context);
  }

  emitLoad() {}

  /* Chat interactions */
  emitMessage(server: Server, sessionId: string, message: BotMessage) {
    return server.to(sessionId).emit('message', message);
  }
  emitTransfer() {}
  emitClose() {}
  emitChatLoad() {} // TODO: =>  last
}
