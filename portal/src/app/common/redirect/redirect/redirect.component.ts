import { Component, Input, OnInit } from '@angular/core';
import { RedirectService } from '../redirect.service';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {
  @Input() message: string = '';
  @Input() url: string;
  @Input() redirectFunc: (url: string) => {};
  @Input()
  get countdown(): number {
    return this._countdown;
  }
  set countdown(value: number) {
    this._countdown = value;
    if (this._countdown > 0) this.startCountdown();
  }
  private _countdown: number;
  public remaining: number;
  public showCountdown: boolean = false;
  go() {
    if (this.url && this.redirectFunc) this.redirectFunc(this.url);
  }

  startCountdown() {
    timer(1000, 1000)
      .pipe(
        map(i => this.countdown - i),
        take(this.countdown + 1)
      )
      .subscribe(i => {
        this.remaining = i;
        if (this.remaining < 1) this.go();
      });
  }
}
