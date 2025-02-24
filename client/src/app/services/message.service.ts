import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnDestroy {
  private socket: Socket;
  private destroy$ = new Subject<void>();

  constructor() {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
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
      // only one message
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    }).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.disconnect();
  }

}