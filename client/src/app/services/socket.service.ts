import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000';
  private destroy$ = new Subject<void>();

  constructor() {
    this.socket = io(this.serverUrl, { transports: ['websocket'] });
  }

  // Send message to server
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Send driver to server
  registerDriver(driver: string): void {
    this.socket.emit('addDriver', driver);
    console.log('driver sent')
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

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('allMessages', (messages: string[]) => {
        // Обрабатываем все сообщения, отправленные сервером
        messages.forEach(message => observer.next(message));
      });
      // only one message
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    }).pipe(takeUntil(this.destroy$));
  }


  // Receive all drivers from server
  receiveAllDrivers(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.socket.on('allDrivers', (drivers: string[]) => {
        // Handle received drivers
        observer.next(drivers);
      });
    }).pipe(takeUntil(this.destroy$));
  }

  receiveNewDriver(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('addedDriver', (driver: string) => {
        // Handle received drivers
        observer.next(driver);
      });
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



  // Disconnect and clean up socket
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.disconnect();
  }
}
