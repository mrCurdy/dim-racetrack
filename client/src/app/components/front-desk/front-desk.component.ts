import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-front-desk',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './front-desk.component.html',
  styleUrl: './front-desk.component.css'
})
export class FrontDeskComponent implements OnInit{
  
  drivers: string[] = [];
  newDriver: string = '';

  editingDriver: string | null = null;
  newDriverName: string = '';

  driverToDelete: string | null = null;
  private subscription: Subscription | null = null;
  ///example
  // sessionMap: Map<number, string> = new Map([
  //   [1, "Driver A"],
  //   [2, "Driver B"],
  //   [3, "Driver C"],
  //   [4, "Driver D"],
  //   [5, "Driver E"],
  //   [6, "Driver F"],
  //   [7, "Driver G"],
  //   [8, "Driver H"]
  // ]);

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.subscription = this.socketService.receiveDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  registerDriver() {
    if (this.newDriver.trim()) {
      this.socketService.registerDriver(this.newDriver.trim());
      this.newDriver = '';
    }
  }

  // Handles keydown events
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Prevent the default behavior (new line) and send the message
      this.registerDriver();
    } 
  }

  confirmDelete(driver: string): void {
    this.driverToDelete = driver;
  }
  cancelDelete(): void {
    this.driverToDelete = null; // Close popup without deleting
  }

  deleteDriver(): void {
    if (this.driverToDelete) {
      this.socketService.deleteDriver(this.driverToDelete);
      this.driverToDelete = null;
    }
  }

  startEdit(driver: string): void {
    this.editingDriver = driver;
    this.newDriverName = driver;
  }

  saveEdit(): void {
    if (this.editingDriver && this.newDriverName.trim()) {
      this.socketService.editDriver(this.editingDriver, this.newDriverName.trim());
      this.editingDriver = null;
      this.newDriverName = '';
    }
  }

  cancelEdit(): void {
    this.editingDriver = null;
    this.newDriverName = '';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
