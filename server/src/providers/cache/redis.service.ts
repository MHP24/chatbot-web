import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger('RedisService');
  private redisClient;

  constructor(private readonly configService: ConfigService) {
    /* Connection instance with redis 
      running from Docker container 
    */
    if (!this.redisClient) {
      this.connect();
    }
  }

  private async connect() {
    this.redisClient = await createClient()
      .on('error', (err) => this.logger.error(err))
      .connect();
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.redisClient.json.get(
        `${this.configService.get('CHAT_ID')}:${key}`,
      );
    } catch (error) {
      this.logger.error(`GET: ${error}`);
      return undefined;
    }
  }

  async set<T>(key: string, value: T) {
    try {
      return await this.redisClient.json.set(
        `${this.configService.get('CHAT_ID')}:${key}`,
        '.',
        value,
      );
    } catch (error) {
      this.logger.error(`SET: ${error}`);
    }
  }

  async update<T>(key: string, prop: string, value: T) {
    try {
      return await this.redisClient.json.set(
        `${this.configService.get('CHAT_ID')}:${key}`,
        `.${prop}`,
        value,
      );
    } catch (error) {
      this.logger.error(`UPDATE: ${error}`);
    }
  }
}
