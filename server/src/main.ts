import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // разрешаем доступ с фронта
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter); // Подключаем адаптер
  await app.listen(3000); // Сервер слушает на порту 3000
  console.log('Server running on http://localhost:3000');
}
bootstrap();
