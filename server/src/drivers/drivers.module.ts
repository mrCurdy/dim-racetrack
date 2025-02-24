import { Module } from '@nestjs/common';
import { DriversGateway } from './drivers.gateway';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { AppGateway } from 'src/shared/app.gateway';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [DriversGateway, DriversService, AppGateway],
  controllers: [DriversController]
})
export class DriversModule {}
