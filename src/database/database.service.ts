import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool, type QueryResultRow } from 'pg';

/**
 * One connection pool for the app, from DATABASE_URL (Naijacloud sets it when a
 * Postgres database is attached). The notes table is created on boot if it is
 * missing, so a fresh database needs no migration step.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set. Attach a Postgres database or set it in .env.');
    }
    this.pool = new Pool({ connectionString, max: 10 });
  }

  async onModuleInit() {
    // A database that is still starting refuses connections for a few seconds.
    for (let attempt = 1; ; attempt++) {
      try {
        await this.pool.query(`
          CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            body TEXT NOT NULL DEFAULT '',
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
          )`);
        this.logger.log('Database ready');
        return;
      } catch (err) {
        if (attempt >= 10) throw err;
        this.logger.warn(`Database not ready (attempt ${attempt}): ${(err as Error).message}`);
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }

  query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
    return this.pool.query<T>(text, params);
  }

  async onApplicationShutdown() {
    await this.pool.end();
  }
}
