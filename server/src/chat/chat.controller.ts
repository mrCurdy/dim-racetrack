import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    
  constructor(private readonly chatService: ChatService) {}
  // just for REST API
  @Get('messages')
  getMessages() {
    return this.chatService.getMessages();
  }
}