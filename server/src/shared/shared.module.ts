import { Module } from '@nestjs/common';
import { AppGateway } from './shared.gateway';

@Module({
providers: [AppGateway],  // Make SharedGateway available
  exports: [AppGateway],    // Export it so it can be imported in other modules
})
export class SharedModule {}
