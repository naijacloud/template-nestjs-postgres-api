import { Controller, Get, Req, Res, ServiceUnavailableException } from '@nestjs/common';
import type { Request, Response } from 'express';

import { DatabaseService } from './database/database.service';
import { WELCOME_PAGE } from './welcome-page';

@Controller()
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get('healthz')
  async health() {
    try {
      await this.db.query('SELECT 1');
      return { status: 'ok', database: 'ok' };
    } catch {
      throw new ServiceUnavailableException({ status: 'degraded', database: 'unreachable' });
    }
  }

  @Get()
  index(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (req.headers.accept?.includes('text/html')) {
      res.type('html');
      return WELCOME_PAGE;
    }
    return {
      name: 'nestjs-postgres-api',
      routes: ['GET /healthz', 'GET /notes', 'POST /notes', 'GET /notes/:id', 'DELETE /notes/:id'],
    };
  }
}
