import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private messages: string[] = []; // Store messages
  private confirmQuestion: boolean = false; // Deletion confirmation

  getMessages(): string[] {
    return this.messages;
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }

  clearMessages(): void {
    this.messages = [];
  }

  setConfirmQuestion(status: boolean): void {
    this.confirmQuestion = status;
  }

  getConfirmQuestion(): boolean {
    return this.confirmQuestion;
  }
}
