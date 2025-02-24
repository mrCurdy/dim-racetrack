import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from 'src/shared/shared.gateway';
import { SharedModule } from 'src/shared/shared.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [SharedModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
