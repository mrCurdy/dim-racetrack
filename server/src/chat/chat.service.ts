import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private messages: string[] = [];
    private confirmQuestion: boolean = false; // Deletion confirmation


    getMessages() {
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
