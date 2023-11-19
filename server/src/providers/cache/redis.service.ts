import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger('RedisService');
  private redisClient;

  constructor() {
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
    const result = await this.redisClient.json.get(key);
    return result;
  }

  async set<T>(key: string, value: T) {
    return await this.redisClient.json.set(key, '.', value);
  }

  async update<T>(key: string, prop: string, value: T) {
    return await this.redisClient.json.set(key, `.${prop}`, value);
  }
}
