import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private messages: string[] = []; // Хранилище сообщений
  private confirmQuestion: boolean; // Подтверждение удаления

  afterInit(server: any) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    // Отправляем все сообщения при подключении клиента
    client.emit('allMessages', this.messages); // Only one Client
  }
  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // Отправляем сообщения уже по одному
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
    this.server.emit('message', message); // for all clients
  }
}
