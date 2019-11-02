import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CheckPhaseAction } from '../../common/phase/state/phase.actions';
import { PHASES_NORMALIZED } from '../../constants/phases.constants';
import { ChecklistItemCategory } from '../../shared/checklist/models/checklist-item-category.enum';
import { ChecklistItemStatus } from '../../shared/checklist/models/checklist-item-status.enum';
import { ChecklistDocument } from '../../shared/checklist/models/state/checklist-state';
import { pendingVehicleDocuments } from '../../shared/checklist/store/checklist.selectors';
import { ProposalDTO } from '../api/proposal';
import { ProposalService } from '../proposal.service';
import {
  proposalIdSelector,
  proposalSelector
} from '../state/proposal.selectors';

@Component({
  selector: 'app-pledge-register',
  templateUrl: './pledge-register.component.html',
  styleUrls: ['./pledge-register.component.scss']
})
export class PledgeRegisterComponent implements OnInit {
  vehiclePendingDocuments = 0;
  proposalId$: Observable<string>;
  pendingDocuments$: Observable<any>;
  headerData: any;
  proposal: ProposalDTO;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService
  ) {}

  ngOnInit() {
    this.store.select(proposalSelector).subscribe(proposal => {
      this.proposal = proposal.proposal;
    });

    this.pendingDocuments$ = this.store.select(pendingVehicleDocuments);
    this.proposalId$ = this.store
      .select(proposalIdSelector)
      .pipe(filter(prop => prop !== '0'));
  }

  filterOnlyByCategory(category: string, item) {
    return item.category === ChecklistItemCategory[category];
  }

  filterOnlyPhase(item) {
    return item.steps.includes('' + PHASES_NORMALIZED['L'].ID_FASE);
  }

  isInEditableStatus(item: ChecklistDocument): boolean {
    return (
      item.status === ChecklistItemStatus.INITIAL ||
      item.status === ChecklistItemStatus.INDEXED
    );
  }

  isInReadOnlyStatus(item: ChecklistDocument): boolean {
    return item.status === ChecklistItemStatus.ANALYZED;
  }

  filterEditableList(category: string) {
    return (d: ChecklistDocument) =>
      this.filterOnlyByCategory(category, d) &&
      this.isInEditableStatus(d) &&
      this.filterOnlyPhase(d);
  }
  filterViewOnlyList(category: string) {
    return (d: ChecklistDocument) =>
      this.filterOnlyByCategory(category, d) &&
      this.isInReadOnlyStatus(d) &&
      this.filterOnlyPhase(d);
  }

  submitPledge() {
    let propId = '';
    this.proposalId$
      .pipe(
        tap(id => (propId = id)),
        switchMap(id => this.proposalService.patchPledge(id)),
        take(1)
      )
      .subscribe(response => {
        this.store.dispatch(new CheckPhaseAction({ proposalId: propId }));
      });
  }
}
