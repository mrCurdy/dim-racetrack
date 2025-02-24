import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './shared/app.gateway';
import { ChatModule } from './chat/chat.module';
import { DriversModule } from './drivers/drivers.module';
import { DriversGateway } from './drivers/drivers.gateway';
import { DriversService } from './drivers/drivers.service';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [
    AppService, ChatGateway, DriversGateway, ChatService, DriversService 
  ]
})
export class AppModule {}
