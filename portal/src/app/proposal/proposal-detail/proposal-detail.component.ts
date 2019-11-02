import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ProposalDTO } from '@app/proposal/api';
import { TranslateService } from '@ngx-translate/core';
import { MARRIED } from '@app/constants/marital-status.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnInit, OnChanges {
  public activeIds: string[] = ['ownerDataPanel'];
  public proposalPanels = [];

  @Input() proposal: ProposalDTO;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.proposal) return;

    this.proposalPanels = [
      {
        id: 'ownerDataPanel',
        title: this.translate.instant('@Owner')
      },
      {
        id: 'vehicleDataPanel',
        title: this.translate.instant('@Vehicle')
      },
      {
        id: 'financingDataPanel',
        title: this.translate.instant('@Financing')
      }
    ];

    if (this.proposal.coOwner) {
      this.proposalPanels.splice(1, 0, {
        id: 'coOwnerDataPanel',
        title: this.translate.instant('@CoOwner')
      });
    }

    if (
      (this.proposal.coOwner ||
        this.proposal.owner.maritalStatus.id === MARRIED) &&
      this.router.url.indexOf('pledge')
    ) {
      this.proposalPanels.splice(4, 0, {
        id: 'legendDataPanel',
        title: this.translate.instant('@Legend')
      });
    }
  }

  ngOnInit() {}

  panelChange(panel) {
    this.activeIds[panel.id] = panel.nextState;
    if (panel.nextState === true) {
      this.activeIds.push(panel.panelId);
    } else {
      this.activeIds = this.activeIds.filter(p => p !== panel.panelId);
    }
  }
}
