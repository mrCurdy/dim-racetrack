import { ChangeDetectorRef, Component } from '@angular/core';
import { SocketService } from './socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';

  message: string = '';
  messages: string[] = [];
  nickName: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe((data) => {
      this.messages = data;
      console.log(this.messages);
    });
  }

  // sendMessage() {
  //   if (this.message.trim()) {
  //     this.socketService.sendMessage(this.message);
  //     this.messages.push(`You: ${this.message}`); // Добавляем ваше сообщение
  //     this.message = ''; // Очищаем поле ввода
  //   }
  // }
  setNickName() {}
  sendMessage() {
    this.socketService.sendMessage(this.nickName + ': ' + this.message);
    console.log('message sent');
    this.message = ''; // Очищаем поле ввода
  }
}
