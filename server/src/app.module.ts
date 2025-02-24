import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { DriverListModule } from './driver-list/driver-list.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    SharedModule,
    ChatModule,
    DriverListModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
