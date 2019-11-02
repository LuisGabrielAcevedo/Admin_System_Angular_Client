import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userSelector } from '@app/common/login/store/login.selectors';
import {
  PARTICIPANTS_TYPE,
  SELLING_POINT_TYPE
} from '@app/constants/panel.contants';
import { ProposalDTOFactory } from '@app/proposal/api/proposal';
import { ProposalService } from '@app/proposal/proposal.service';
import { LoadProposalAction } from '@app/proposal/state/proposal.actions';
import { proposalPanelSelector } from '@app/proposal/state/proposal.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  PHASES_NORMALIZED,
  PHASES_PROCESS_STATUS
} from '../../constants/phases.constants';
import {
  BRANCH_MANAGER,
  ROLES_ACCESS
} from './../../constants/roles.constants';

@Component({
  selector: 'app-panel-detail',
  templateUrl: './panel-detail.component.html',
  styleUrls: ['./panel-detail.component.scss']
})
export class PanelDetailComponent implements OnInit, OnDestroy {
  public ownerType = PARTICIPANTS_TYPE.OWNER_TYPE;
  public coOwnerType = PARTICIPANTS_TYPE.CO_OWNERTYPE;

  protected ngUnsubscribe: Subject<any> = new Subject();

  public headerData: any;

  public shownComments = [];
  public commentGap = 5;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<any>,
    private proposalService: ProposalService
  ) {}

  public proposal = ProposalDTOFactory();

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(id => {
          if (id.idProposal) {
            this.store.dispatch(
              new LoadProposalAction({ proposalId: id.idProposal })
            );
          }
        }),
        switchMap(id => {
          return combineLatest(
            this.proposalService.getProposalsStatus(id.proposal),
            this.store.select(proposalPanelSelector)
          );
        })
      )
      .subscribe(([proposalStatus, proposal]) => {
        if (!proposal.proposalNumber) {
          return;
        }
        const status = proposalStatus.phaseProcessStatus
          ? proposalStatus.phaseProcessStatus
          : PHASES_PROCESS_STATUS.NOT_RUNNING;
        const showButton = status === PHASES_PROCESS_STATUS.NOT_RUNNING;
        this.headerData = {
          account:
            proposal.account && proposal.account.accountDTO
              ? proposal.account.accountDTO.accountNumber
              : '',
          cStore:
            proposal.store.strategyCode !== SELLING_POINT_TYPE.BRANCH
              ? proposal.store.branchCode
              : false,
          sConcierge:
            proposal.store.strategyCode === SELLING_POINT_TYPE.BRANCH &&
            proposal.account &&
            proposal.account.conciergeDTO
              ? proposal.account.conciergeDTO.name
              : null,
          proposalNumber: proposal.proposalNumber,
          proposalStatus: {
            ...proposalStatus,
            ...PHASES_NORMALIZED[proposalStatus.code],
            showButton
          }
        };

        this.store
          .select(userSelector)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(user => {
            const r = user.roles;
            const isBranchManager = r.some(role => role === BRANCH_MANAGER);
            const hasProposalAccess = r.some(
              role => ROLES_ACCESS.PROPOSAL.indexOf(role) >= 0
            );
            const isPledge =
              proposalStatus.code === PHASES_NORMALIZED.I.PHASES_CODE ||
              proposalStatus.code === PHASES_NORMALIZED.L.PHASES_CODE;
            const isAppointment =
              proposalStatus.code === PHASES_NORMALIZED.S.PHASES_CODE;

            this.headerData.isUserAuthorized =
              (hasProposalAccess && !isBranchManager) ||
              (isBranchManager && (isPledge || isAppointment));
          });
      });

    this.store
      .select(proposalPanelSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.proposal = data;
        this.collapseComments();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  backTo() {
    this.router.navigate(['/panel/proposals']);
  }

  addMoreComents() {
    if (this.proposal.commentsList) {
      this.shownComments = this.proposal.commentsList.slice(
        0,
        this.shownComments.length + this.commentGap
      );
    }
  }

  collapseComments() {
    if (this.proposal.commentsList) {
      this.shownComments = this.proposal.commentsList.slice(0, 1);
    }
  }
}
