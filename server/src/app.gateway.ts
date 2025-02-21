import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './services/message.service';
import { DriverService } from './services/driver.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly driverService: DriverService
  ) {}

  afterInit(server: any) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    // Send all messages and drivers upon connection
    client.emit('allMessages', this.messageService.getMessages());
    client.emit('allDrivers', this.driverService.getDrivers());
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Received message:', message);

    if (message === 'delete: history') {
      message = 'Are you sure to delete chat history? nickname = yes, message = delete';
      this.messageService.setConfirmQuestion(true);
    }
    if (this.messageService.getConfirmQuestion() && message === 'yes: delete') {
      this.messageService.clearMessages();
      message = '';
      this.server.emit('allMessages', this.messageService.getMessages());
    }

    this.messageService.addMessage(message);
    this.server.emit('message', message); // for all clients
  }

  @SubscribeMessage('addDriver')
  handleAddDriver(@MessageBody() driver: string): void {
    console.log('Received driver:', driver);
    this.driverService.addDriver(driver);
    this.server.emit('allDrivers', this.driverService.getDrivers());
  }

  @SubscribeMessage('updateDrivers')
  handleUpdateDrivers(@MessageBody() updatedDrivers: string[]): void {
    console.log('Updated driver list:', updatedDrivers);
    this.driverService.updateDrivers(updatedDrivers);
    this.server.emit('allDrivers', this.driverService.getDrivers()); // Notify all clients
  }

  @SubscribeMessage('deleteDriver')
  handleDeleteDriver(@MessageBody() driver: string): void {
    this.driverService.deleteDriver(driver);
    this.server.emit('allDrivers', this.driverService.getDrivers()); // Notify all clients
  }

  @SubscribeMessage('editDriver')
  handleEditDriver(@MessageBody() { oldName, newName }: { oldName: string; newName: string }): void {
  console.log(`Editing driver: ${oldName} → ${newName}`);
  this.driverService.updateDriver(oldName, newName);
  this.server.emit('allDrivers', this.driverService.getDrivers()); // Notify all clients
}

  
}
