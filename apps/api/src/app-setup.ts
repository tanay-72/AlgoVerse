import helmet from 'helmet';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

export function configureApp(app: INestApplication): void {
  app.use(helmet());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
  const origins = corsOrigin.split(',').map((origin) => origin.trim());

  app.enableCors({
    origin: origins.includes('*') ? true : origins,
    credentials: true,
  });
}
