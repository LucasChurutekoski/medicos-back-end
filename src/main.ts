import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({

    origin: [
      'http://localhost:3000', 
      'http://localhost:4200', 
      'http://localhost:8080', 
      'http://127.0.0.1:5173', 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe({
  
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, 
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
