import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'

@Injectable()
export class SocketService {
    public socketStatus: boolean = false;
    constructor(
        private socket: Socket
    ) {
        this.checkStatus();
    }

    checkStatus() {
        this.socket.on('connect', () => {
            console.log('conectado');
            this.socketStatus = true;
        })

        this.socket.on('disconnect', () => {
            console.log('Desconectado');
            this.socketStatus = false;
        })
    }

    emit(event: string, payload?: any, callback?: Function) {
        this.socket.emit(event, payload, callback);
    }

    listen(event: string) {
        return this.socket.fromEvent(event);
    }
}