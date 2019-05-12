import { Injectable } from '@angular/core';
// import { SocketService } from './socket.service';

@Injectable()
export class MessageService {
    constructor(
        // public socket: SocketService
    ) { }
    sendMessage(message: string) {
        // this.socket.emit('message', message);
    }
    getMessages() {
        // return this.socket.listen('mensaje-nuevo');
    }
}