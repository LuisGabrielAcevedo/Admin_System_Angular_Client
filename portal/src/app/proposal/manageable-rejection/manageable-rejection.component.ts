import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/common/modal';
import { ProposalDTOFactory } from '@app/proposal/api/proposal';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentsList } from '../data-register/api/proposalDTO';
import { proposalSelector } from '../state/proposal.selectors';
import { ManageableRejectionService } from './services/manageable-rejection.service';
import { ChecklistItemCategory } from '@app/shared/checklist/models/checklist-item-category.enum';
import { ChecklistItemStatus } from '@app/shared/checklist/models/checklist-item-status.enum';
import { PHASES_NORMALIZED } from '@app/constants/phases.constants';
import { ChecklistDocument } from '@app/shared/checklist/models/state/checklist-state';
import { loginSelector } from '@app/common/login/store/login.selectors';
import { LoginState } from '@app/common/login/store/login.state';

@Component({
  selector: 'app-manageable-rejection',
  templateUrl: './manageable-rejection.component.html',
  styleUrls: ['./manageable-rejection.component.scss']
})
export class ManageableRejectionComponent implements OnInit {
  protected ngUnsubscribe: Subject<any> = new Subject();

  public pendingDocuments: number = 0;

  public isPending = true;

  public proposalId: number;
  public commentGap: number = 5;
  public comments: CommentsList[];
  private comment: string;
  private userName: string;

  constructor(
    private manageableRejectionService: ManageableRejectionService,
    private router: Router,
    private store: Store<any>,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  public proposal = ProposalDTOFactory();

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data && data.proposal) {
          this.proposalId = data.proposal.proposalNumber;
          this.comments = data.proposal.commentsList;
        }
      });

    this.store
      .select(loginSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: LoginState) => {
        if (data && data.userData) {
          this.userName = data.userData.name;
        }
      });
  }

  public setComment(comment) {
    this.comment = comment;
  }

  private checkDocumentsStatus() {
    const withoutPendencies = 0;
    setTimeout(() => {
      this.isPending =
        this.pendingDocuments === withoutPendencies ? false : true;
    }, 0);
  }

  public setPendingDocuments(pendingDocuments: number) {
    this.pendingDocuments = pendingDocuments;
    this.checkDocumentsStatus();
  }

  filterOnlyByCategory(category: string, item) {
    return item.category === ChecklistItemCategory[category];
  }
  filterNotAnalyzed(item) {
    return item.status !== ChecklistItemStatus.ANALYZED;
  }
  filterOnlyPhase(item) {
    return item.steps.includes('' + PHASES_NORMALIZED['G'].ID_FASE);
  }

  filterEditableList() {
    return (d: ChecklistDocument) =>
      this.filterNotAnalyzed(d) && this.filterOnlyPhase(d);
  }

  private goToPanelDetail() {
    this.router.navigate([`panel/detail/${this.proposalId}`]);
  }

  return() {
    this.goToPanelDetail();
  }

  private commentPayload() {
    const SENT = 'C';
    return {
      type: this.comment ? SENT : null,
      message: this.comment ? this.comment : null,
      user: this.comment ? this.userName : null,
      date: this.comment ? Date.now().toString() : null
    };
  }

  submit() {
    const COMMENT_PAYLOAD = this.commentPayload();
    this.manageableRejectionService
      .postMessage(COMMENT_PAYLOAD, this.proposalId)
      .subscribe(() => {
        this.showConfirmationModal();
      });
  }

  private showConfirmationModal() {
    const modalRef = this.modalService.success(
      this.translate.instant('@Risk Analysis Proposal'),
      '',
      [
        {
          label: this.translate.instant('@Go to Panel'),
          action: this.goToPanelDetail.bind(this),
          type: 'secondary'
        }
      ],
      this.goToPanelDetail.bind(this)
    );
    modalRef.componentInstance.modalCloseOutput.subscribe(
      (action: Function) => {
        action();
      }
    );
    modalRef.componentInstance.modalOutput.subscribe((action: Function) => {
      action();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
