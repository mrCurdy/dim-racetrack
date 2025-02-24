import { Module } from '@nestjs/common';
import SessionsGateway from './sessions.gateway';
import { SessionsService } from './sessions.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [SessionsGateway, SessionsService]
})
export class SessionsModule {}
