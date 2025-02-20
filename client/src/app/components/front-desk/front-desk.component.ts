import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-front-desk',
  imports: [],
  templateUrl: './front-desk.component.html',
  styleUrl: './front-desk.component.css'
})
export class FrontDeskComponent implements OnInit{
  
  drivers: string[] = [];
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

  constructor(private headerService: HeaderService) {}
  
  ngOnInit(): void {
    this.headerService.setHeader('Front Desk'); // Change header for Front Desk
  }

}
