import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('en');
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menssageSubscription.unsubscribe();
  }
}
