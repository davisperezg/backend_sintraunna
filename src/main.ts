import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.URL_FRONTEND_ORIGIN });
  await app.listen(process.env.PORT_APP);
}
bootstrap();
