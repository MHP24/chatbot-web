import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger('RedisService');
  private redisClient;

  constructor() {
    /* Connection instance with redis running from Docker container */
    if (!this.redisClient) {
      this.connect();
    }
  }

  private async connect() {
    this.redisClient = await createClient()
      .on('error', (err) => this.logger.error(err))
      .connect();
  }

  /* Basic Redis key, value implementation */
  async set<T>(key: string, value: T) {
    return await this.redisClient.json.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }

  async del(key: string) {
    return await this.redisClient.del(key);
  }

  /* Complex Redis implementation, key, value (object, suport generics) */
  async getJson<T>(key: string): Promise<T | undefined> {
    const result = await this.redisClient.get(key);
    return result;
  }

  async setJson<T>(key: string, value: T) {
    return await this.redisClient.json.set(key, '.', value);
  }
}
