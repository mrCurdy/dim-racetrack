import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private messages: string[] = []; // Хранилище сообщений
  private confirmQuestion: boolean;

  afterInit(server: any) {
    console.log('WebSocket Server Initialized');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Received message:', message);
    if (message === 'delete: history') {
      message =
        'Are you sure to delete chat history? nickname = yes, message = delete';
      this.confirmQuestion = true;
    }
    if (this.confirmQuestion && message === 'yes: delete') {
      this.messages = [];
      message = '';
    }
    this.messages.push(message);
    this.server.emit('message', this.messages);
  }
}
