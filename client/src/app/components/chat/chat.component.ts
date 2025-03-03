import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule, 
    MatIconModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;


  recievedMsg: string = '';
  sentMsg: string = '';
  nickName: string = '';
  messages: string[] = [];

  constructor(private messageServie: MessageService) {}


  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scrolling failed:', err);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.messageServie.receiveMessage().subscribe((data: string) => {
      this.recievedMsg = data;
      this.messages.push(data);
      console.log(this.recievedMsg);
    });
  }

  setNickName() {}

  sendMessage() {
    if (this.nickName) {
      this.messageServie.sendMessage(this.nickName + ': ' + this.sentMsg);
      console.log('message sent');
      this.sentMsg = ''; // Очищаем поле ввода
    } else {
      console.log("enter nickname")
    }
  }

  // Handles keydown events
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.ctrlKey) {
      // Prevent the default behavior (new line) and send the message
      event.preventDefault();
      this.sendMessage();
    } else if (event.key === 'Enter' && event.ctrlKey) {
      // Allow new line when Ctrl + Enter is pressed
      this.sentMsg += '\n';
    }
  }


}
