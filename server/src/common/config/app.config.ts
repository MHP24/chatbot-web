import { config } from 'dotenv';
import * as joi from 'joi';
import { MessageOrigin } from '../../modules/chat/types';
import { Flow } from '../../modules/flows/types';
config();

interface EnvVars {
  PORT: number;
  SERVER_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  CHAT_INSTANCE: string;
  CHAT_TIMEOUT: number;
  DEFAULT_FLOW: Flow;
  DEFAULT_FLOW_KEY: string;
  DEFAULT_FLOW_KEY_TYPE: MessageOrigin;
  DATABASE_URL: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    SERVER_URL: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.number().required(),
    CHAT_INSTANCE: joi.string().required(),
    CHAT_TIMEOUT: joi.number().required(),
    DEFAULT_FLOW: joi.string().required(),
    DEFAULT_FLOW_KEY: joi.string().required(),
    DEFAULT_FLOW_KEY_TYPE: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(error.message);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  serverUrl: envVars.SERVER_URL,
  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
  chatInstance: envVars.CHAT_INSTANCE,
  chatTimeout: envVars.CHAT_TIMEOUT,
  defaultFlow: envVars.DEFAULT_FLOW,
  defaultFlowKey: envVars.DEFAULT_FLOW_KEY,
  defaultFlowKeyType: envVars.DEFAULT_FLOW_KEY_TYPE,
};
