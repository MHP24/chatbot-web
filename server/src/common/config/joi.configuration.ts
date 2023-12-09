import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number(),
  SERVER_URL: Joi.string(),
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  DEFAULT_FLOW: Joi.string(),
  DEFAULT_FLOW_KEY: Joi.string(),
  DEFAULT_FLOW_KEY_TYPE: Joi.string(),
  CHAT_INSTANCE: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_PORT: Joi.number(),
  DATABASE_URL: Joi.string(),
  CHAT_TIMEOUT: Joi.number(),
});
