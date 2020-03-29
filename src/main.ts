import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.EXPRESS_PORT, () => {
    console.log(process.env.EXPRESS_PORT);
  });
}
bootstrap();
