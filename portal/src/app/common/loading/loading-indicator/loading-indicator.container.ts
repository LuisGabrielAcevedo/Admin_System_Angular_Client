import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoadingState, loadingSelector } from '../store/loading.state';

@Component({
  selector: 'app-loading-indicator',
  template: `
    <app-spinner [loading]="isLoading"></app-spinner>
  `
})
export class LoadingIndicatorContainer implements OnInit {
  isLoading: boolean = false;

  constructor(
    private store: Store<LoadingState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(loadingSelector),
        select(state => Object.keys(state.ongoingRequests).length > 0)
      )
      .subscribe((b: boolean) => {
        this.isLoading = b;
        this.cd.detectChanges();
        this.toggleTabLock();
      });
  }

  lockTabFunction(event) {
    event.preventDefault();
  }

  toggleTabLock() {
    if (this.isLoading) {
      document.addEventListener('keydown', this.lockTabFunction);
    } else {
      document.removeEventListener('keydown', this.lockTabFunction);
    }
  }
}
