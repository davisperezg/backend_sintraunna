import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.NODE_ENV);
  console.log(process.env.URL_FRONTEND_ORIGIN);
  console.log(process.env.PORT_APP);
  app.enableCors({ origin: process.env.URL_FRONTEND_ORIGIN });
  await app.listen(process.env.PORT_APP);
}
bootstrap();
