import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverListService implements OnDestroy {
  private socket: Socket;
  private destroy$ = new Subject<void>();

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
  }

  registerDriver(driver: string): void {
    this.socket.emit('addDriver', driver);
    console.log('Driver sent');
  }

  updateDrivers(drivers: string[]): void {
    this.socket.emit('updateDrivers', drivers);
  }

  editDriver(oldName: string, newName: string): void {
    this.socket.emit('editDriver', { oldName, newName });
  }

  deleteDriver(driver: string): void {
    this.socket.emit('deleteDriver', driver);
  }

  receiveNewDriver(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('addedDriver', (driver: string) => {
        // Handle received drivers
        observer.next(driver);
      });
    }).pipe(takeUntil(this.destroy$));
  }

  receiveAllDrivers(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.socket.on('allDrivers', (drivers: string[]) => observer.next(drivers));
    }).pipe(takeUntil(this.destroy$));
  }

  receiveEditedDriver(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.socket.on('editedDriver', (editedDriver: string[]) => {
        // Handle received drivers
        observer.next(editedDriver);
      });
    }).pipe(takeUntil(this.destroy$));
  }

  receiveDeletedDriver(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('deletedDriver', (driver: string) => {
        // Handle received drivers
        observer.next(driver);
      });
    }).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.disconnect();
  }
}

//Can implement it better:
//   receiveDriverUpdates(event: string): Observable<string | string[]> {
//     return new Observable<string | string[]>((observer) => {
//       this.socket.on(event, (data: string | string[]) => observer.next(data));
//     }).pipe(takeUntil(this.destroy$));
//   }
