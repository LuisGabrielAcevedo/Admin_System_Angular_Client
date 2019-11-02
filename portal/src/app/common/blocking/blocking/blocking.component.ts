import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PhaseService } from '../../phase/phase.service';
import { Store } from '@ngrx/store';
import { proposalSelector } from '../../../proposal/state/proposal.selectors';
import { HideBlockingAction } from '../state/blocking.actions';
import {
  PHASES_NORMALIZED,
  PHASES_PROCESS_STATUS
} from '../../../constants/phases.constants';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-blocking',
  templateUrl: './blocking.component.html',
  styleUrls: ['./blocking.component.scss']
})
export class BlockingComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  @Input() message = '';
  proposalId = 0;
  constructor(
    private phaseService: PhaseService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(
        switchMap(proposal => {
          if (proposal.proposal.proposalNumber) {
            this.proposalId = proposal.proposal.proposalNumber;
            return this.phaseService.getPhasePol(
              '' + proposal.proposal.proposalNumber
            );
          } else {
            return of({});
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(response => {
        const fullStatus =
          response &&
          response.phaseProcessStatus === PHASES_PROCESS_STATUS.NOT_RUNNING &&
          PHASES_NORMALIZED[response.code] &&
          PHASES_NORMALIZED[response.code].URL
            ? PHASES_NORMALIZED[response.code].URL
            : 'panel/detail';
        this.store.dispatch(new HideBlockingAction());
        this.router.navigate([fullStatus + '/' + this.proposalId]);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
