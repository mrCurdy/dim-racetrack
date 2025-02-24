import { Component, OnInit } from "@angular/core";
import { DriverListService } from "../../services/driver-list.service";
import { HeaderService } from "../../services/header.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-session-editer',
  imports: [],
  templateUrl: './session-editer.component.html',
  styleUrl: './session-editer.component.css'
})
export class SessionEditerComponent implements OnInit {


  header: string = 'Session editer';
  
  numberOfSessions: number = 1;
  editingSession: string | null = null;
  newSessionName: string = '';

  newDriver: string = '';

  editingDriver: string | null = null;
  newDriverName: string = '';

  driverToDelete: string | null = null;

  private subscriptions: Subscription[] | null = null;

  // Store sessions as an array of Maps
  sessions: Map<number, string>[] = [
    new Map([[0, 'Session 1']]) // Initial session with 1 driver slot
  ];

  constructor(
    private driverListService: DriverListService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    
    this.headerService.setHeader(this.header);


  // ngOnDestroy(): void {
  //   // this.subscriptions?.forEach(sub => sub.unsubscribe());
  // }
}
}
