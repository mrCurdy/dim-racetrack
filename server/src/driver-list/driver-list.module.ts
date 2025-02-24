import { Module } from '@nestjs/common';
import { DriverListGateway } from './driver-list.gateway';
import { DriverListService } from './driver-list.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [DriverListGateway, DriverListService],
})
export class DriverListModule {}
