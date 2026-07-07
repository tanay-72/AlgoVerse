import { Controller, Get } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

@Controller('health')
export class HealthController {
  @Get()
  check(): { status: 'ok'; timestamp: string; commit: string; builtAt: string } {
    const builtAtFile = join(__dirname, '.built-at');

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      commit: process.env.RAILWAY_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA ?? 'unknown',
      builtAt: existsSync(builtAtFile) ? readFileSync(builtAtFile, 'utf-8').trim() : 'unknown',
    };
  }
}
