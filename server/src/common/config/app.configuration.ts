export const appConfig = () => ({
  port: +process.env.PORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: +process.env.REDIS_PORT,
  defaultFlow: process.env.DEFAULT_FLOW,
  defaultFlowKey: process.env.DEFAULT_FLOW_KEY,
  defaultFlowKeyType: process.env.DEFAULT_FLOW_KEY_TYPE,
  chatInstance: process.env.CHAT_INSTANCE,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: +process.env.DB_PORT,
  databaseUrl: process.env.DATABASE_URL,
  chatTimeout: +process.env.CHAT_TIMEOUT,
});
