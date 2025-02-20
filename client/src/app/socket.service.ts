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

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('allMessages', (messages: string[]) => {
        // Обрабатываем все сообщения, отправленные сервером
        messages.forEach(message => observer.next(message));
      });

      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    }).pipe(takeUntil(this.destroy$));
  }
  // Отключение от сокета при уничтожении
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.disconnect();
  }
}

// receiveMessage(): Observable<string[]> {
//   return new Observable((observer) => {
//     this.socket.on('message', (messages: string[]) => {
//       observer.next(messages);
//     });
//   }).pipe(takeUntil(this.destroy$));
// }
