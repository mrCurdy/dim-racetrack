import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AppGateway } from 'src/shared/shared.gateway';

@WebSocketGateway()
export class ChatGateway {
    
    constructor(private readonly chatService: ChatService,
        private readonly appGateway: AppGateway,
    ) {}

    afterInit(server: any) {
    console.log('WebSocket Server Initialized');
    }

    handleConnection(client: Socket) {
    // Send all messages and drivers upon connection
    client.emit('allMessages', this.chatService.getMessages());
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
    console.log('Received message:', message);

    if (message === 'delete: history') {
        message = 'Are you sure to delete chat history? nickname = yes, message = delete';
        this.chatService.setConfirmQuestion(true);
    }
    if (this.chatService.getConfirmQuestion() && message === 'yes: delete') {
        this.chatService.clearMessages();
        message = '';
        this.appGateway.server.emit('allMessages', this.chatService.getMessages());
    }

    this.chatService.addMessage(message);
    this.appGateway.server.emit('message', message); // for all clients
    }

}
