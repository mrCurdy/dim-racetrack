import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  private drivers: string[] = []; // Store drivers

  getDrivers(): string[] {
    return this.drivers;
  }

  addDriver(driver: string): void {
    this.drivers.push(driver);
  }
}
