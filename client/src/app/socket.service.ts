import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.serverUrl, { transports: ['websocket'] });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  receiveMessage(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('message', (messages: string[]) => {
        observer.next(messages);
      });
    });
  }
}
