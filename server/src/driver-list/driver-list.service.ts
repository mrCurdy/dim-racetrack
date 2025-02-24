import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DriverListService {

  private drivers: string[] = []; // Store drivers
  private readonly filePath = path.join(__dirname, '../../data', 'drivers.json');

  // Load drivers from JSON file on startup
  async onModuleInit() {
    this.loadDrivers();
  }
  // Save drivers to JSON on shutdown

  private async loadDrivers(): Promise<void> {
    if (!fs.existsSync(this.filePath)) {
      console.log('drivers.json not found, creating a new one...');
      await this.saveDrivers(); // Creates the file with an empty array
    } else {
      try {
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        this.drivers = JSON.parse(data);
      } catch (error) {
        console.error('Error loading drivers:', error);
      }
    }
  }
  
  private async saveDrivers(): Promise<void> {
    try {
      // Ensure the directory exists
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
      }
      // Write data asynchronously
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.drivers, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving drivers:', error);
    }
  }
  

  getDrivers(): string[] {
    return this.drivers;
  }
  // just to understand the logic
  getDriver(driver: string): string {
    return this.drivers[this.drivers.indexOf(driver)]
  }

  addDriver(driver: string): void {
    if (!this.drivers.includes(driver)) {
      this.drivers.push(driver);
      this.saveDrivers();
    } else {
      console.error('This name is already registered!')
    }
  }

  deleteDriver(driver: string): void {
    this.drivers = this.drivers.filter(d => d !== driver);
    this.saveDrivers();
  }

  updateDrivers(updatedDrivers: string[]): void {
    this.drivers = updatedDrivers;
    this.saveDrivers();
  }

  updateDriver(oldName: string, newName: string): void {
    const index = this.drivers.findIndex(d => d === oldName);
    if (index !== -1) {
      if (!this.drivers.includes(newName)) {
        this.drivers[index] = newName;
        this.saveDrivers();
      } else {
        console.error('driver with name ' + newName + ' is already exist')
      }
    }
  }
}

