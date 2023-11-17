import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number(),
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
});
