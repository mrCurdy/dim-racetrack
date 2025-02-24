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
  header: string = 'Front Desk'

  drivers: string[] = [];
  newDriver: string = '';

  editingDriver: string | null = null;
  newDriverName: string = '';

  driverToDelete: string | null = null;
  private subscriptions: Subscription[] | null = null;
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

  constructor(
    private socketService: SocketService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    
    this.headerService.setHeader(this.header);

    // Array of subscriptions, It is better to unsubscrube on array of subscpriptions than to owerwrite it
    this.subscriptions = [];

  // Subscribe to receive all drivers
  this.subscriptions.push(
    this.socketService.receiveAllDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      console.log('all drivers recieved');
    })
  );

  // Subscribe to receive a new driver
  this.subscriptions.push(
    this.socketService.receiveNewDriver().subscribe(driver => {
      this.drivers.push(driver);
      console.log('new driver recieved')
    })
  );

  // Subscribe to receive edited driver
  this.subscriptions.push(
    this.socketService.receiveEditedDriver().subscribe(editedDriver => {
      const index = this.drivers.findIndex(d => d === editedDriver[0]);
      if (index !== -1) {
        this.drivers[index] = editedDriver[1];
      }
    })
  );
  
  // Subscribe to receive deleted driver
  this.subscriptions.push(
    this.socketService.receiveDeletedDriver().subscribe(driver => {
      this.drivers = this.drivers.filter(d => d !== driver);
    })
  );
}

  // add popup window
  registerDriver() {
    if (!this.drivers.includes(this.newDriver.trim()) ) {
      this.socketService.registerDriver(this.newDriver.trim());
      this.newDriver = '';
    } else {

    }
  }

  // Handles keydown events
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Prevent the default behavior (new line) and send the message
      this.registerDriver();
    } 
  }

  //Delete driver
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

  //Edit driver
  startEdit(driver: string): void {
    this.editingDriver = driver;
    this.newDriverName = driver;
  }
  // need to add a popup window
  saveEdit(): void {
    if (this.editingDriver && this.newDriverName.trim() && !this.drivers.includes(this.newDriverName.trim())) {
      this.socketService.editDriver(this.editingDriver, this.newDriverName.trim());
      this.editingDriver = null;
      this.newDriverName = '';
    }
  }
  cancelEdit(): void {
    this.editingDriver = null;
    this.newDriverName = '';
  }

  // Prevent memory leaks
  ngOnDestroy(): void {
    this.subscriptions?.forEach(sub => sub.unsubscribe());  
  }

}
