import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from 'src/shared/app.gateway';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ChatController],
  providers: [ChatService, AppGateway]
})
export class ChatModule {}
