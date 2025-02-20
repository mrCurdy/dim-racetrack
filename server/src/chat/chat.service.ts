import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private messages = [];

    getMessages() {
        return this.messages;
    }
}
