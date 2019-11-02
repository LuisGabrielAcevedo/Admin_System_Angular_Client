import { Component, OnInit } from '@angular/core';
import { proposalSelector } from '@app/proposal/state/proposal.selectors';
import { Store } from '@ngrx/store';
import { ProposalDTO } from '../../api/proposal';
import { TranslateService } from '@ngx-translate/core';
import { PLEDGES } from '@app/constants/document.constants';

@Component({
  selector: 'app-panel-detail-header',
  templateUrl: './panel-detail-header.component.html'
})
export class PanelDetailHeaderComponent implements OnInit {
  constructor(private store: Store<any>, public translate: TranslateService) {}

  public proposal: ProposalDTO;
  public pledgeType: string;

  ngOnInit() {
    this.store.select(proposalSelector).subscribe(proposal => {
      this.proposal = proposal.proposal;
      if (this.proposal && this.proposal.pledgeType) {
        const p = this.proposal.pledgeType;
        this.pledgeType =
          p === PLEDGES.INSCRIBED_PLEDGE
            ? this.translate.instant('@Inscribed pledge')
            : this.translate.instant('@Pre pledge');
      } else {
        this.pledgeType = '-';
      }
    });
  }
}
