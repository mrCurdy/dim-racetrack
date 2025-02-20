import { Component, Input, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  template: `<h1>{{ header }}</h1>`,
})
export class ToolbarComponent implements OnInit{

  header: string = ""

  timer: string = "00:00:000"

  constructor(private headerService: HeaderService) {}
  
  ngOnInit(): void {
    this.headerService.header$.subscribe(header => {
      this.header = header; // Update header whenever it changes
    });
  }
}
