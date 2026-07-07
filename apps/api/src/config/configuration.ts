export interface AppConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string[];
  databaseUrl: string;
}

export default (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.PORT ?? '4000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigin: (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim()),
    databaseUrl: process.env.DATABASE_URL ?? '',
  },
});
