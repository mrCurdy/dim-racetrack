import { Component, OnInit } from "@angular/core";
import { DriverListService } from "../../services/driver-list.service";
import { HeaderService } from "../../services/header.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { SessionsService } from "../../services/sessions.service";

@Component({
  selector: 'app-session-editer',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './session-editer.component.html',
  styleUrl: './session-editer.component.css'
})
export class SessionEditerComponent implements OnInit {


  header: string = 'Session editer';
  

  private subscriptions: Subscription[] | null = null;

  // Store sessions as array of maps
  // sessions: Map<number, string>[] = [
  //   new Map([
  //     [0, 'Session 1']
  //   ])
  //   ]
  sessions = [
    new Map([
      [0, 'Session 1'], 
      [1, 'Driver 1'], 
      [2, 'Driver 2'], 
      [3, 'Driver 3']
    ]),
    new Map([
      [0, 'Session 2'],
      [1, 'Driver 4'],
      [2, 'Driver 5']
    ])
  ];
  //max lenght should be 8
  driverNumInOneSession: number = 8;


  newDriver: string = '';
  newDriversSession: string = '';

  currentSessionIndex: number | null = null;

  constructor(
    private sessionsService: SessionsService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');

    this.currentSessionIndex = 0;
    
    this.headerService.setHeader(this.header);
  
    // Array of subscriptions, It is better to unsubscrube on array of subscpriptions than to owerwrite it
    this.subscriptions = [];

    // Subscribe to receive all drivers
    this.subscriptions.push(
      this.sessionsService.recieveAddedIntoSessionDriver().subscribe((sessionDriver) => {
        // this.drivers = drivers;
        const session: string = sessionDriver[0];
        const driver: string = sessionDriver[1];
        this.addDriverIntoSession(session, driver);
        console.log('driver recieved');
      })
    );
  }

  // Handles keydown events
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Prevent the default behavior (new line) and send the message
      if (this.newDriver && this.newDriversSession) {
        this.sessionsService.addDriverIntoSession(this.newDriversSession, this.newDriver);
        console.log('registering driver')
      } else {
        console.log(' driver or session is not defined ')
      }
    } 
  }
  getDrivers(session: Map<number, string>): string[] {
    const drivers: string[] = [];
    // Iterate over the map and get drivers from keys 1 to 8
    for (let i = 1; i <= 8; i++) {
        if (session.has(i)) {
            drivers.push(session.get(i)!);  // Push the driver name into the array
        }
    }
    return drivers;
}


    // Select a session to work on
    selectSession(sessionIndex: number): void {
      this.currentSessionIndex = sessionIndex;
    }
    //need to modify it
    addDriver(): void {
      if (this.currentSessionIndex !== null && this.newDriver.trim() !== '') {
        const session = this.sessions[this.currentSessionIndex];
        const lastDriverNumber = session.size; // Gets the next available driver number
        session.set(lastDriverNumber, this.newDriver.trim()); // Add new driver to the session
  
        this.newDriver = ''; // Clear the input field after adding driver
      }
    }



    // add popup window
    addDriverIntoSession(sessionName: string, driverName: string): void {
      // Find the session map by the session name
      for (const session of this.sessions) {
          if (session.get(0) === sessionName) {  // Check if the session name matches
              if (session.size >= 9) {  // Session can have only 8 drivers (key 1-8)
                  console.log("Session is full! Cannot add more drivers.");
                  return;
              }
              // Find the next available key (driver number)
              let nextKey = 1;
              while (session.has(nextKey)) {
                  nextKey++;
              }
              session.set(nextKey, driverName);  // Add the driver to the session
              console.log(`Driver ${driverName} added to ${sessionName}`);
              return;
          }
      }
      console.log("Session not found");
      }
  
  
    ngOnDestroy(): void {
      // this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}
