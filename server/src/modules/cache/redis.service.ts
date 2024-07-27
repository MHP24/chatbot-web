import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { envs } from '../../common/config';

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
    this.redisClient = await createClient({
      url: `redis://${envs.redisHost}:${envs.redisPort}`,
    })
      .on('error', (err) => this.logger.error(err))
      .connect();
  }

  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.redisClient.json.get(`${envs.chatInstance}:${key}`);
    } catch (error) {
      this.logger.error(`GET: ${error}`);
      return undefined;
    }
  }

  async set<T>(key: string, value: T) {
    try {
      return await this.redisClient.json.set(
        `${envs.chatInstance}:${key}`,
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
        `${envs.chatInstance}:${key}`,
        `.${prop}`,
        value,
      );
    } catch (error) {
      this.logger.error(`UPDATE: ${error}`);
    }
  }

  async delete(key: string) {
    try {
      this.redisClient.del(`${envs.chatInstance}:${key}`);
    } catch (error) {
      this.logger.error(`DELETE: ${error}`);
    }
  }
}
