import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/http/socket.service';
import { MessageService } from './services/http/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  menssageSubscription: Subscription;
  constructor(
    public messageService: MessageService,
    // public socketService: SocketService
  ) { }

  ngOnInit() {
    // this.messageService.sendMessage('Hola desde angular');
    // this.menssageSubscription = this.messageService.getMessages().subscribe(msg => {
    //   console.log(msg);
    // })
  }

  ngOnDestroy() {
    this.menssageSubscription.unsubscribe();
  }
}
