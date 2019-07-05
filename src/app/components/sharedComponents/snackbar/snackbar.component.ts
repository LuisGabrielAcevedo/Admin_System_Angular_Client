import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { SnackbarSandbox } from '../../../sandbox/snackbar.sandbox';
import { filter } from 'rxjs/operators';
import { ISnackbarMessage } from '../../../inferfaces/snackbar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(
    public snackBar: MatSnackBar,
    public snackBarSandbox: SnackbarSandbox
  ) { }
  ngOnInit() {
    this.subscriptions.push(
      this.snackBarSandbox.fetchNewMessage()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(newMessage => {
          this.openSnackBar(newMessage);
        })
    );
  }

  openSnackBar(newMessage: ISnackbarMessage) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    if (typeof newMessage.message === 'object') {
      for (const msg in newMessage.message) {
        if (newMessage.message[msg]) {
          this.snackBar.open(newMessage.message[msg], newMessage.action ? newMessage.action : null, config);
        }
      }
    } else {
      this.snackBar.open(newMessage.message, newMessage.action ? newMessage.action : null, config);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
