import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AppGateway } from 'src/shared/shared.gateway';
import { SessionsService } from './sessions.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export default class SessionsGateway {

  constructor(
      private readonly sessionsService: SessionsService,
      private readonly sharedGateway: AppGateway,) {}
  
    afterInit(server: any) {
      console.log('WebSocket Server Initialized');
    }
  
    handleConnection(client: Socket) {
      // Send all messages and drivers upon connection
      // client.emit('allDrivers', this.driverListService.getDrivers());
    }
  
    @SubscribeMessage('addDriverIntoSession')
    handleAddDriver(@MessageBody() session: string, driver: string): void {
      console.log('Received driver:', session, driver);
      this.sessionsService.addDriverIntoSession(session, driver);
      // this.sharedGateway.server.emit('addedToSessionDriver', this.sessionsService.getDriverFromSession(session, driver));
      this.sharedGateway.server.emit('addedIntoSessionDriver', [session, driver]);
    }
  
}
// 