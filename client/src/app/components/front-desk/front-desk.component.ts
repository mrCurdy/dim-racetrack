import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  //example
  sessionMap: Map<number, string> = new Map([
    [1, "Driver A"],
    [2, "Driver B"],
    [3, "Driver C"],
    [4, "Driver D"],
    [5, "Driver E"],
    [6, "Driver F"],
    [7, "Driver G"],
    [8, "Driver H"]
  ]);

  constructor(private headerService: HeaderService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.headerService.setHeader('Front Desk'); // Change header for Front Desk
    this.socketService.receiveDrivers().subscribe((data) => {
      this.drivers = data;
      console.log(this.drivers);
    });
  }

  registerDriver() {
    if (this.newDriver) {
      this.socketService.registerDriver(this.newDriver);
      console.log('driver registered');
      this.newDriver = ''; // Очищаем поле ввода
    } else {
      console.log("enter driver")
    }
  }

  // Handles keydown events
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Prevent the default behavior (new line) and send the message
      this.registerDriver();
    } 
  }

}
