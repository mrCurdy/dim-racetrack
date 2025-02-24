import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { DriversService } from './drivers.service';
import { AppGateway } from 'src/shared/app.gateway';

@WebSocketGateway()
export class DriversGateway {

  constructor(
    private readonly driversService: DriversService,
    private readonly appGateway: AppGateway,) {}

  afterInit(server: any) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    // Send all messages and drivers upon connection
    client.emit('allDrivers', this.driversService.getDrivers());
  }

  @SubscribeMessage('addDriver')
  handleAddDriver(@MessageBody() driver: string): void {
    console.log('Received driver:', driver);
    this.driversService.addDriver(driver);
    this.appGateway.server.emit('addedDriver', this.driversService.getDriver(driver));
  }

  @SubscribeMessage('deleteDriver')
  handleDeleteDriver(@MessageBody() driver: string): void {
    console.log(driver + " deleted")
    this.driversService.deleteDriver(driver);
    this.appGateway.server.emit('deletedDriver', driver);
  }

  @SubscribeMessage('editDriver')
  handleEditDriver(@MessageBody() { oldName, newName }: { oldName: string; newName: string }): void {
    console.log(`Driver ${oldName} edited to ${newName}`);
    this.driversService.updateDriver(oldName, newName);
    this.appGateway.server.emit('editedDriver', [oldName, this.driversService.getDriver(newName)]);
  }
}
