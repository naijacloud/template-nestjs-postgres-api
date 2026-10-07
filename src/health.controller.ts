import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

import { DatabaseService } from './database/database.service';

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
  index() {
    return {
      name: 'nestjs-postgres-api',
      routes: ['GET /healthz', 'GET /notes', 'POST /notes', 'GET /notes/:id', 'DELETE /notes/:id'],
    };
  }
}
