import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number(),
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  DEFAULT_FLOW: Joi.string(),
  DEFAULT_FLOW_KEY: Joi.string(),
  DEFAULT_FLOW_KEY_TYPE: Joi.string(),
  HAS_SURVEY: Joi.boolean(),
});
