import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { SetSellingAction } from '../state/proposal-selling/proposal.selling.actions';
import { LoadProposalStatusAction } from '../state/proposal-status/proposal.status.actions';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {
  public allProposals: any[];

  constructor(
    private store: Store<any>,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadProposalStatusAction());
    this.store.dispatch(
      new SetSellingAction({
        sellingPoint: {
          sellingPointCode: this.sessionStorageService.getSellingPointCode()
        }
      })
    );
  }

  public allProposalsChanged(proposals: any[]): void {
    this.allProposals = proposals;
  }
}
