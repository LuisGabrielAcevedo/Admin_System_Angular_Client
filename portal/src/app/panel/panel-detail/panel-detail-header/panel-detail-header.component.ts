import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '@app/proposal';
import { PHASES_NORMALIZED } from './../../../constants/phases.constants';

@Component({
  selector: 'app-panel-detail-header',
  templateUrl: './panel-detail-header.component.html',
  styleUrls: ['./panel-detail-header.component.scss']
})
export class PanelDetailHeaderComponent {
  @Input() headerData;

  constructor(
    private router: Router,
    private proposalService: ProposalService
  ) {}

  nextPage(url) {
    this.router.navigate([url + '/' + this.headerData.proposalNumber]);
  }

  reload(): void {
    this.proposalService
      .getProposalsStatus(this.headerData.proposalNumber)
      .subscribe(res => {
        this.headerData.proposalStatus = {
          ...this.headerData.proposalStatus,
          ...res,
          ...PHASES_NORMALIZED[res.code]
        };
      });
  }
}
