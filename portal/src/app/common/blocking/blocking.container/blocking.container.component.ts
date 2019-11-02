import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  blockingSelector,
  blockingMessageSelector
} from '../state/blocking.selectors';
import { HideBlockingAction } from '../state/blocking.actions';
import { BlockingState } from '../state/blocking.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blocking-container',
  templateUrl: './blocking.container.component.html',
  styleUrls: ['./blocking.container.component.scss']
})
export class BlockingContainerComponent implements OnInit {
  blocking$: Observable<boolean>;
  message$: Observable<string>;
  constructor(private store: Store<BlockingState>) {}

  ngOnInit() {
    this.blocking$ = this.store.select(blockingSelector);
    this.message$ = this.store.select(blockingMessageSelector);
  }

  hideModal() {
    this.store.dispatch(new HideBlockingAction());
  }
}
