import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  // Close the database pool cleanly when a redeploy sends SIGTERM.
  app.enableShutdownHooks();
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  new Logger('Bootstrap').log(`Listening on :${port}`);
}

void bootstrap();
