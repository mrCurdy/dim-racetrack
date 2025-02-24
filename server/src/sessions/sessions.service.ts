import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
    // Store sessions as an 2d array
  sessions: Map<number, string>[] = [
  new Map([
    [0, 'Session 1']
  ])
  ]
  //max lenght should be 8
  driverNumInOneSession: number = 8;

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
}
