import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { MessageService } from './services/message.service';
import { DriverService } from './services/driver.service';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [
    AppService, 
    AppGateway, 
    MessageService, 
    DriverService,
  ],
})
export class AppModule {}
