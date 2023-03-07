import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');

  const port = process.env.SERVER_PORT;
  await app.listen(port);

  logger.log(`Application successfully started on port ${port}`);
}
bootstrap();
