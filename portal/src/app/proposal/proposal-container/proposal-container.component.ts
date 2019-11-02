import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProposalHeaderData } from '../proposal-header/proposal-header-data.model';
import { proposalHeaderSelector } from '../state/proposal.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-proposal-container',
  templateUrl: './proposal-container.component.html',
  styleUrls: ['./proposal-container.component.scss']
})
export class ProposalContainerComponent implements OnInit, OnDestroy {
  public proposalHeaderData: ProposalHeaderData;
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store
      .select(proposalHeaderSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(proposalHeaderData => {
        this.proposalHeaderData = proposalHeaderData;
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
