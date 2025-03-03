import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { DriverListService } from './driver-list.service';
import { AppGateway } from 'src/shared/shared.gateway';

@WebSocketGateway()
export class DriverListGateway {

  constructor(
    private readonly driverListService: DriverListService,
    private readonly sharedGateway: AppGateway,) {}

  afterInit(server: any) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    // Send all messages and drivers upon connection
    client.emit('allDrivers', this.driverListService.getDrivers());
  }

  @SubscribeMessage('addDriver')
  handleAddDriver(@MessageBody() driver: string): void {
    console.log('Received driver:', driver);
    this.driverListService.addDriver(driver);
    this.sharedGateway.server.emit('addedDriver', this.driverListService.getDriver(driver));
  }

  @SubscribeMessage('deleteDriver')
  handleDeleteDriver(@MessageBody() driver: string): void {
    console.log(driver + " deleted")
    this.driverListService.deleteDriver(driver);
    this.sharedGateway.server.emit('deletedDriver', driver);
  }

  @SubscribeMessage('editDriver')
  handleEditDriver(@MessageBody() { oldName, newName }: { oldName: string; newName: string }): void {
    console.log(`Driver ${oldName} edited to ${newName}`);
    this.driverListService.updateDriver(oldName, newName);
    this.sharedGateway.server.emit('editedDriver', [oldName, this.driverListService.getDriver(newName)]);
  }
}
