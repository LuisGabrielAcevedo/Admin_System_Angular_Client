import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnriPayload, EnriRequest } from './api/enri';
import { EnriService } from './services/enri.service';
import { Store } from '@ngrx/store';
import { proposalSelector } from '@app/proposal/state/proposal.selectors';
import {
  PatchProposalDTO,
  PatchPartialProposalFactory
} from '@app/proposal/api/patch.proposal.req';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/common/modal';
import { TranslateService } from '@ngx-translate/core';
const OWNER = 'owner';
@Component({
  selector: 'app-enri',
  templateUrl: './enri.component.html',
  styleUrls: ['./enri.component.scss']
})
export class EnriComponent implements OnInit {
  protected ngUnsubscribe: Subject<any> = new Subject();

  public formDependencyRelationship: FormGroup;
  public formDoesNotWork: FormGroup;
  public formOwnAccount: FormGroup;

  public dependencyRelationship: boolean = false;
  public doesNotWork: boolean = false;
  public ownAccount: boolean = false;
  public acceptTerms: boolean = false;

  public formSubmitAttempt = false;
  public enriForm: EnriPayload;
  private occupation;
  private customer: string;
  private proposalNumber: number;
  private hasCoOwner: boolean;

  constructor(
    private enriService: EnriService,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        const ROUTE = this.activatedRoute.snapshot.url;
        const COOWNER = 'coowner';
        let segmentUser = ROUTE.map(segment => {
          if (segment.path === OWNER) {
            return segment.path;
          } else if (segment.path === COOWNER) {
            return segment.path;
          }
        });
        this.customer = segmentUser[0];
        if (!data.loading) {
          this.proposalNumber = data.proposal.proposalNumber;
          if (this.customer === OWNER) {
            this.occupation = data.proposal.owner.occupation;
          } else if (this.customer === COOWNER) {
            this.occupation = data.proposal.coOwner.occupation;
          }
          this.hasCoOwner = data.proposal.coOwner ? true : false;
          switch (this.occupation.integrationCode) {
            case 'RDEP':
              this.dependencyRelationship = true;
              break;
            case 'NTRA':
              this.doesNotWork = true;
              break;
            case 'CPRO':
              this.ownAccount = true;
              break;
          }
        }
      });
  }

  public formChange(event: EnriPayload) {
    this.enriForm = event;
  }

  private generatePayload(): EnriRequest {
    const VERSION = '1';
    return {
      version: VERSION,
      answers: this.enriForm.answers,
      occupation: this.occupation
    };
  }

  closeRedirect() {
    if (this.customer === OWNER) {
      if (this.hasCoOwner) {
        this.router.navigate([
          `proposal/data-register/coowner/${this.proposalNumber}`
        ]);
      } else {
        this.router.navigate([
          `proposal/data-register/vehicle/${this.proposalNumber}`
        ]);
      }
    } else {
      this.router.navigate([
        `proposal/data-register/vehicle/${this.proposalNumber}`
      ]);
    }
  }

  failEnriClose() {
    this.router.navigate([`/pre-proposal/identification`]);
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.enriForm && this.enriForm.status) {
      const PAYLOAD = this.generatePayload();
      this.enriService
        .postEnri(this.proposalNumber, this.customer, PAYLOAD)
        .subscribe(res => {
          if (res && res.approved === true) {
            this.closeRedirect();
          } else {
            const modalEnriFailRef = this.modalService.warning(
              this.translate.instant(
                '@MSG_Unfortunately we can not process your Super Account online request'
              ),
              '',
              [
                {
                  label: this.translate.instant('@Accept'),
                  action: this.failEnriClose.bind(this),
                  type: 'secondary'
                }
              ],
              this.failEnriClose.bind(this)
            );
            modalEnriFailRef.componentInstance.modalCloseOutput.subscribe(
              (action: Function) => {
                action();
              }
            );
            modalEnriFailRef.componentInstance.modalOutput.subscribe(
              (action: Function) => {
                action();
              }
            );
          }
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
