import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ModalComponent, ModalService } from '@app/common/modal';
import { PLEDGES } from '@app/constants/document.constants';
import { BRANCH_OFFICE } from '@app/constants/selling-point.constants';
import { ValidateEmail } from '@app/shared/directives/email.validator';
import { DownloadService } from '@app/shared/services/download.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CheckPhaseAction } from '../../common/phase/state/phase.actions';
import * as ChecklistAppAction from '../../shared/checklist/store/actions/checklist.app.actions';
import { ProposalDTO, State } from '../api/proposal';
import { ProposalService } from '../proposal.service';
import { ProposalState } from '../state/proposal.model';
import { proposalSelector } from './../state/proposal.selectors';
import {
  Contract,
  ContractListResponse,
  ContractResponse
} from './api/contract';
import { PledgeCapacity, PostFormalization } from './api/formalization';
import { FormalizationService } from './services/formalization.service';

@Component({
  selector: 'app-formalization',
  templateUrl: './formalization.component.html',
  styleUrls: ['./formalization.component.scss']
})
export class FormalizationComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  /*Forms*/
  public formRequest: FormGroup;
  public formChecklist: FormGroup;
  public formPledges: FormGroup;

  protected proposal: ProposalDTO;
  protected proposalNumber: number;
  public formSubmitAttempt = false;

  public isLaRiojaProvinceOwner: boolean = false;
  public isLaRiojaProvinceCoOwner: boolean = false;

  public quota: boolean = true;
  public activePledge: string = '';

  public contractPanelDisabled: boolean = true;
  public docsPanelDisabled: boolean = true;
  public requestPanelDisabled: boolean = true;

  public pledgeCapacity: PledgeCapacity;
  public pledgeCapacityFailed: boolean = false;
  public isDealership: boolean = false;

  public ownerPendingDocuments: number = 0;
  public coOwnerPendingDocuments: number = 0;
  public vehiclePendingDocuments: number = 0;
  public isPending = true;
  public backInThePhase: boolean = false;

  public contractsList: ContractListResponse;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private translate: TranslateService,
    private formalizationService: FormalizationService,
    private store: Store<any>,
    private downloadService: DownloadService,
    private proposalService: ProposalService
  ) {}

  ngOnInit() {
    this.generateForm();
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ProposalState) => {
        if (!data.loading && data.proposal) {
          this.proposal = data.proposal;
          this.proposalNumber = data.proposal.proposalNumber;
          this.getPhase(data.proposal);
          this.pledgeIsChanged();
          this.proposalService.pledgeCapacity(this.proposal.store.id).subscribe(
            res => {
              this.pledgeCapacity = res ? res : null;
              if (this.pledgeCapacity) this.checkCapacity(data.proposal);
            },
            err => {
              this.pledgeCapacity = null;
              this.pledgeCapacityFailed = true;
              this.formPledges
                .get('pledges')
                .patchValue(PLEDGES.INSCRIBED_PLEDGE);
            }
          );

          if (data.proposal.owner) {
            this.formRequest.patchValue({
              email: data.proposal.owner.email
            });
          }
        }
      });
  }
  /**
   * Call phase service, check if is backInThePhase
   * @param proposal proposal from store
   */
  private getPhase(proposal: ProposalDTO): void {
    this.proposalService
      .getPhase(this.proposalNumber)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(phase => {
        if (phase && phase.backInThePhase) {
          this.backInThePhase = phase.backInThePhase;
          this.docsPanelDisabled = false;
          this.updateFormsValidator();
        }
        this.checkAddressState(proposal);
      });
  }

  /**
   * get the state of address
   * @param p proposal data
   */
  private checkAddressState(p: ProposalDTO): void {
    if (!this.backInThePhase) {
      const stateOfOwner = p.owner ? p.owner.address.state : null;
      const stateOfCoOwner = p.coOwner ? p.coOwner.address.state : null;
      this.isLaRiojaProvinceOwner = stateOfOwner
        ? this.isLaRioja(stateOfOwner)
        : false;
      this.isLaRiojaProvinceCoOwner = stateOfCoOwner
        ? this.isLaRioja(stateOfCoOwner)
        : false;
      this.setValidatorAndValueFormChecklist();
    }
  }

  /**
   * Check if is La Rioja state
   * @param state of address
   */
  private isLaRioja(state: State): boolean {
    return state.description === 'LA RIOJA' ? true : false;
  }
  /**
   * Updates validators and value of checklist form when owner or coOwner are from laRioja
   */
  private setValidatorAndValueFormChecklist(): void {
    if (this.isLaRiojaProvinceOwner) {
      this.laRiojaOwner.setValidators([Validators.requiredTrue]);
      this.laRiojaOwner.setValue(true);
    }
    if (this.isLaRiojaProvinceCoOwner) {
      this.laRiojaCoOwner.setValidators([Validators.requiredTrue]);
      this.laRiojaCoOwner.setValue(true);
    }
    this.laRiojaOwner.updateValueAndValidity();
    this.laRiojaCoOwner.updateValueAndValidity();
  }

  /**
   * get list of contracts from service
   */
  private getContracts(): void {
    this.formalizationService
      .getContracts(this.proposalNumber)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.contractsList = data;
      });
  }

  /**
   *  Generate forms
   */
  private generateForm(): void {
    this.formRequest = this.formBuilder.group({
      email: [null, [Validators.required, ValidateEmail()]]
    });

    this.formChecklist = this.formBuilder.group({
      laRiojaOwner: [null],
      laRiojaCoOwner: [null]
    });

    this.formPledges = this.formBuilder.group({
      pledges: [null]
    });
  }

  /**
   * Get email value
   */
  get email(): string {
    return this.formRequest.get('email').value;
  }
  /**
   * Get laRiojaOwner control
   */
  get laRiojaOwner(): FormControl {
    return this.formChecklist.get('laRiojaOwner') as FormControl;
  }
  /**
   * Get laRiojaCoOwner control
   */
  get laRiojaCoOwner(): FormControl {
    return this.formChecklist.get('laRiojaCoOwner') as FormControl;
  }

  /**
   *  Trigger getDocument
   * @param selectedDocument document selected to download
   */
  contractDownload(selectedDocument: Contract): void {
    this.getDocument(selectedDocument);
    this.docsPanelDisabled = false;
    if (!this.backInThePhase) {
      this.requestPanelDisabled = false;
    }
  }

  /**
   *  Get document data from service and call function to convert it
   * @param selectedDocument document selected to download
   */
  public getDocument(selectedDocument: Contract): void {
    this.formalizationService
      .getContract(this.proposalNumber, selectedDocument.code)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data) {
          this.base64ToBlob(data, selectedDocument);
        }
      });
  }

  /**
   *  Convert a base64 file to blob and download it
   * @param document document to convert to blob
   * @param selectedDocument selected document information
   */
  private base64ToBlob(
    document: ContractResponse,
    selectedDocument: Contract
  ): void {
    const extension = '.pdf';
    const base64Str = document.content;
    const base64Type = document.contentType;
    const documentName = selectedDocument.description;
    this.downloadService.base64ToBlob(
      base64Str,
      base64Type,
      `${documentName}${extension}`
    );
  }

  onDocsComplete(): void {
    this.requestPanelDisabled = false;
  }

  /**
   * Confirm success modal
   */
  confirmRequest(): void {
    const modalRef = this.modalService.success(
      this.translate.instant(
        '@Thank you, your request is under analisys. You will receive an answer shortly'
      ),
      '',
      [],
      () =>
        this.store.dispatch(
          new CheckPhaseAction({ proposalId: this.proposalNumber })
        )
    );
    const m = modalRef.componentInstance as ModalComponent;
    m.modalCloseOutput.subscribe((f: () => void) => f());
  }

  /**
   *  generate the payload
   */
  private generatePayload(): PostFormalization {
    return {
      email: this.backInThePhase ? null : this.email,
      foodDebtVerificationAuthorizedOwner: this.laRiojaOwner.value,
      foodDebtVerificationAuthorizedCoOwner: this.laRiojaCoOwner.value
    };
  }

  public setPendingDocumentsOwner(pendingDocuments: number): void {
    this.ownerPendingDocuments = pendingDocuments;
    this.checkDocumentsStatus();
  }
  public setPendingDocumentsCoOwner(pendingDocuments: number): void {
    this.coOwnerPendingDocuments = pendingDocuments;
    this.checkDocumentsStatus();
  }
  public setPendingDocumentsVehicle(pendingDocuments: number): void {
    this.vehiclePendingDocuments = pendingDocuments;
    this.checkDocumentsStatus();
  }

  private checkDocumentsStatus(): void {
    const withoutPendencies = 0;
    setTimeout(() => {
      this.isPending =
        this.ownerPendingDocuments +
          this.coOwnerPendingDocuments +
          this.vehiclePendingDocuments ===
        withoutPendencies
          ? false
          : true;
    }, 0);
  }

  private updateFormsValidator(): void {
    this.formRequest.setValidators(null);
    this.formRequest.updateValueAndValidity();
    this.formChecklist.setValidators(null);
    this.formChecklist.updateValueAndValidity();
  }

  /**
   * send payload
   */
  public submit(): void {
    this.formSubmitAttempt = true;
    if (this.formRequest.valid && this.formChecklist.valid) {
      const formalizationPayload = this.generatePayload();
      this.formalizationService
        .postFormalization(this.proposalNumber, formalizationPayload)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          res => {
            if (!res) return;
            this.confirmRequest();
          },
          err => (this.formSubmitAttempt = false)
        );
    } else {
      this.modalService.error(
        this.translate.instant('@Correct the incorrect/incomplete data'),
        ''
      );
    }
  }

  private pledgeIsChanged(): void {
    this.formPledges
      .get('pledges')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged()
      )
      .subscribe(selectedPledge => {
        if (selectedPledge) {
          this.formalizationService
            .postSwitchPledge(this.proposalNumber, selectedPledge)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
              this.getContracts();
              this.store.dispatch(
                new ChecklistAppAction.ChecklistRemoteLoadAction(
                  this.proposalNumber
                )
              );
            });
        }
      });
  }

  private checkCapacity(proposal: ProposalDTO) {
    const stratCode = this.proposal.store.strategyCode;
    const pledge = this.formPledges.get('pledges');
    if (stratCode !== BRANCH_OFFICE) this.isDealership = true;

    if (!this.pledgeCapacity.hasCapacity) {
      pledge.patchValue(PLEDGES.INSCRIBED_PLEDGE);
    } else {
      if (proposal.pledgeType) pledge.patchValue(proposal.pledgeType);
    }
  }

  /**
   * Destroy
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
