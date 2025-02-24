
import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionsService implements OnDestroy {
    private socket: Socket;
    private destroy$ = new Subject<void>();

    constructor() {
        this.socket = io('http://localhost:3000', { transports: ['websocket'] });
    }
    
    addDriverIntoSession(session: string | undefined, driver: string): void {
        if (!session) {
            console.error('Session is undefined')
        }
        this.socket.emit('addDriverIntoSession', session, driver);
        console.log('Driver sent');
    }
    recieveAddedIntoSessionDriver(): Observable<string[]> {
        return new Observable<string[]>((observer) => {
          this.socket.on('addedIntoSessionDriver', (driver) => {
            observer.next(driver);
          });
        }).pipe(takeUntil(this.destroy$));
      }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.socket.disconnect();    }
}