import { Injectable } from '@nestjs/common';

@Injectable()
export class DriversService {

  private drivers: string[] = []; // Store drivers

  getDrivers(): string[] {
    return this.drivers;
  }
  // just to understand the logic
  getDriver(driver: string): string {
    return this.drivers[this.drivers.indexOf(driver)]
  }

  addDriver(driver: string): void {
    this.drivers.push(driver);
    console.log('driver added')
  }

  deleteDriver(driver: string): void {
    this.drivers = this.drivers.filter(d => d !== driver);
  }

  updateDrivers(updatedDrivers: string[]): void {
    this.drivers = updatedDrivers;
  }

  updateDriver(oldName: string, newName: string): void {
    const index = this.drivers.findIndex(d => d === oldName);
    if (index !== -1) {
      this.drivers[index] = newName;
    }
  }
}

