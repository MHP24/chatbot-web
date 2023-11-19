export const appConfig = () => ({
  port: +process.env.PORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: +process.env.REDIS_PORT,
  defaultFlow: process.env.DEFAULT_FLOW,
  defaultFlowKey: process.env.DEFAULT_FLOW_KEY,
  defaultFlowKeyType: process.env.DEFAULT_FLOW_KEY_TYPE,
});
