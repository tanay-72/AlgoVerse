import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app-setup';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

const promise = (async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  configureApp(app);
  await app.init();
})();

export default async function handler(req: any, res: any) {
  await promise;
  server(req, res);
}
