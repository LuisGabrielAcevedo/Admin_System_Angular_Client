import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '@app/proposal';
import { AccountService } from '../services/account.service';
import { Subject } from 'rxjs';
import { ProposalDTO } from '@app/proposal/api';
import { ModalService } from '@common/modal/modal.service';
import { AccountPartialProposal } from '../api/accountPartialProposal';
import { Store } from '@ngrx/store';
import { proposalSelector } from '@app/proposal/state/proposal.selectors';
import { Gestor } from '../api/gestor';
import {
  PatchProposalDTO,
  PatchProposalDTOFactory
} from '@app/proposal/api/patch.proposal.req';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Branch, BranchResponse } from '../api/branch';
import { DomainsService } from '../../../pre-proposal/services/domains.service';
import { takeUntil, distinctUntilChanged, tap } from 'rxjs/operators';
import { SellingPoint } from '../../../shared/services/api/sellingPoint';
import { SellingPointService } from '../../../shared/services/selling-point.service';
import { CheckPhaseAction } from '../../../common/phase/state/phase.actions';
import { ToastService } from '@app/common/toast/toast.service';
import { ToastType } from '@app/common/toast/toast.models';
import { ModalComponent } from '@app/common/modal';

const MANAGEABLE_REJECTION = 'RG';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  protected ngUnsubscribe: Subject<any> = new Subject();
  public accountForm: FormGroup;
  public proposalDTO: ProposalDTO;
  public proposal: PatchProposalDTO;
  public accounts: AccountPartialProposal;
  public accountPartialProposal: any;

  public bankAccounts: Array<any> = [];
  public bankAccountsOwner: Array<any> = [];
  public bankAccountsCoOwner: Array<any> = [];

  public bankSubsidiaries: Array<Branch> = [];
  public bankManager: Array<any> = [];
  private bankNumberOwner: number = null;
  private bankNumberCoOwner: number = null;
  public userChannel: string = '';
  public suggestedBranch = '';
  public formSubmitted: boolean = false;

  public accountHolder: boolean; // True for accountHolder
  public openAccount: boolean; // True for new account, false for existing account
  public isSellingPoint: boolean; // concesionaria o sucursal
  public hasManager: boolean; // True when the sucursal have Manager

  public isManageableRejection: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private accountService: AccountService,
    private proposalService: ProposalService,
    private store: Store<any>,
    private router: Router,
    private domainsService: DomainsService,
    private translate: TranslateService,
    private sellingPointService: SellingPointService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.hasManager = false; // true for gestor, false for against
    this.openAccount = false; // if the user will open an account
    this.accountHolder = true; // if the user has accounts assigned to him
    this.bankAccounts = [
      {
        description: this.translate.instant('@Open an account'),
        id: 0,
        type: ''
      }
    ];
    this.createForm();
    this.proposal = PatchProposalDTOFactory();
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.proposalDTO = data.proposal;

        if (this.proposalDTO !== undefined) {
          if (!data.loading) {
            if (
              this.proposalDTO.scoring &&
              this.proposalDTO.scoring.riskEvaluation &&
              this.proposalDTO.scoring.riskEvaluation.riskEvaluationResultDTO
            ) {
              const repairable = this.proposalDTO.scoring.riskEvaluation
                .riskEvaluationResultDTO.repairable;
              this.isManageableRejection =
                repairable === MANAGEABLE_REJECTION ? true : false;
            }
            this.getProposalDTOData();
            this.checkIfHasAccount();
          }
        }
      });
    this.sellingPointSubscription();
  }

  /**
   * Create accout form
   */
  private createForm() {
    this.accountForm = this.formBuilder.group({
      accountNumber: [null, [Validators.required]],
      sellingPoint: [null, [Validators.required]],
      manager: [null, [Validators.required]]
    });
  }

  /**
   * Gets of form
   */
  get accountNumber() {
    return this.accountForm.get('accountNumber');
  }

  get manager() {
    return this.accountForm.get('manager');
  }

  get sellingPoint() {
    return this.accountForm.get('sellingPoint');
  }

  /**
   *  Get data from proposalDTO
   */
  private getProposalDTOData() {
    this.userChannel = this.proposalDTO.store.id.toString();
    this.checkUserChannel();
    this.getBankNumbers();
  }

  /**
   * Verify channel and get data of it
   */
  private checkUserChannel() {
    this.sellingPointService
      .getSellingPoint(this.userChannel)
      .subscribe(res => {
        if (res) {
          this.isBranchCheck(res);
        }
      });
  }

  /**
   * Verify the kind of selling point,sucursal or concesionaria, to get the suggested Branch
   * @param res selling point response
   */
  private isBranchCheck(res: SellingPoint) {
    const SUCURSAL = 'SUCU';
    if (res.strategyCode.toUpperCase() === SUCURSAL) {
      // check if is sucursal
      this.isSellingPoint = true; // true for sucursal, false for concesionaria
      this.suggestedBranch = res.sellingPointCode;
    } else {
      this.isSellingPoint = false;
      this.suggestedBranch = res.branchCode;
    }

    if (!this.isSellingPoint) {
      this.manager.setValidators(null);
      this.manager.updateValueAndValidity();
    }

    this.getBranch(true); // TRUE for return just branches
  }

  /**
   * Get bank numbers of owner and coowner from proposalDTO
   */
  private getBankNumbers() {
    if (this.proposalDTO.owner) {
      this.bankNumberOwner = this.proposalDTO.owner.nup;
    }
    if (this.proposalDTO.coOwner) {
      this.bankNumberCoOwner = this.proposalDTO.coOwner.nup;
    }
  }

  /**
   * Verify if the owner or coOwner have a valid bankNumber
   */
  private checkIfHasAccount() {
    if (this.bankNumberOwner || this.bankNumberCoOwner) {
      this.openAccount = false;
      this.getAccount();
    } else {
      this.toastService.add(
        this.translate.instant(
          '@The applicant must open a new account to continue with the loan'
        ),
        ToastType.warning
      );
      this.openAccount = true;
      this.accountNumber.setValue(0);
      this.accountNumber.disable();
    }
  }

  /**
   * Get owner and coOwner account data
   */
  private getAccount() {
    this.accountService
      .getAccount(this.bankNumberOwner, this.bankNumberCoOwner)
      .subscribe(res => {
        this.setAccount(res);
      });
  }

  /**
   * Set owner and coOwner account Data
   */
  private setAccount(res: AccountPartialProposal) {
    this.accounts = res;
    this.setAccountList();
  }

  /**
   * Mount list of accounts from owner and coOwner
   */
  private setAccountList() {
    if (this.accounts) {
      const OWNER = {
        accountType: 'ownerAccountList',
        bankAccountType: 'bankAccountsOwner'
      };
      const COOWNER = {
        accountType: 'coOwnerAccountList',
        bankAccountType: 'bankAccountsCoOwner'
      };

      this.getAccountData(OWNER.accountType, OWNER.bankAccountType);
      this.getAccountData(COOWNER.accountType, COOWNER.bankAccountType);

      if (this.bankAccounts.length <= 1) {
        // if accounts is empty, set to open a new account and disable field
        this.accountNumber.setValue(0);
        this.accountNumber.disable();
        this.accountHolder = false;
      } else {
        this.accountHolder = true;
      }
    }
  }

  /**
   *  Do the map for accounts and joins the accounts in a single array
   * @param accountType Array of accounts for owner and coowner before map
   * @param bankAccountType Array to add accounts for owner and coowner after map
   */
  public getAccountData(accountType: string, bankAccountType: string) {
    const OWNER = 'owner';
    const COOWNER = 'coOwner';
    if (this.accounts[accountType]) {
      this[bankAccountType] = this.accounts[accountType].map(value => ({
        description: `${value.sellingPoint.integrationCode.toString()} - ${value.accountNumber.toString()} - ${this.translate.instant(
          accountType === 'ownerAccountList' ? '@Owner' : '@CoOwner'
        )}`,
        id: value.accountNumber.toString(),
        type: accountType === 'ownerAccountList' ? OWNER : COOWNER,
        branch: value.sellingPoint.idSellingPoint
      }));
      this.bankAccounts = this.bankAccounts.concat(this[bankAccountType]);
    }
  }

  /**
   * update Manager when the selling point is changed
   */
  private sellingPointSubscription() {
    this.sellingPoint.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        this.resetManager();
        this.checkToGetManager(res);
      });
  }

  /**
   * Reset Manager, control and array
   */
  private resetManager() {
    this.bankManager = []; // reset array of Manager
    this.manager.reset();
  }

  /**
   * Verify conditions to call getManager
   * @param value sellingPoint Control
   */
  private checkToGetManager(value) {
    if (this.isSellingPoint && this.openAccount) {
      if (
        this.sellingPoint.value !== null &&
        this.accountNumber.value !== null
      ) {
        this.getManager(value);
      }
    }
  }

  /**
   * Change the screen behavior as the value changes
   * @param event from dropdown
   */
  public changeAccount(event) {
    if (event) {
      const accountId = event.id;
      if (accountId === null) {
        this.sellingPoint.reset();
        this.openAccount = false;
      } else if (Number(accountId) === 0) {
        this.openAccount = true;
        this.sellingPoint.setValidators([Validators.required]);
        this.manager.reset();
        if (this.isSellingPoint) {
          this.manager.reset();
          this.getManager(this.suggestedBranch);
        }
      } else {
        this.openAccount = false;
        this.sellingPoint.setValidators(null);
        if (this.isSellingPoint) {
          this.manager.reset();
          this.getManager(this.suggestedBranch);
        }
      }
      this.sellingPoint.updateValueAndValidity();
    }
    this.resetDefaultBranch();
  }

  /**
   * hide sellinpoint field when clear account
   */
  public clearAccount() {
    this.openAccount = false;
  }

  public clearSellingPoint() {
    this.hasManager = false;
  }

  /**
   * get a list of sucursals or a sucursal
   * @param id code of sucursal
   */
  private getBranch(isBranch: boolean) {
    this.domainsService.getSellingPoints(isBranch).subscribe(res => {
      this.setBranch(res);
    });
  }

  /**
   *
   * @param res response of getBranch
   */
  private setBranch(res: Array<BranchResponse>) {
    this.bankSubsidiaries = res.map(branch => ({
      ...branch,
      name: `${branch.city} - ${branch.name}`
    }));
    this.resetDefaultBranch();
  }

  /**
   * Reset sellingPoint control to default suggestedBranch
   */
  private resetDefaultBranch() {
    if (this.suggestedBranch !== undefined) {
      this.accountForm.patchValue({
        sellingPoint: this.suggestedBranch
      }); // assign the defaut sucursal to form
    }
  }

  private getIdSellingPoint(sellingPointCode: string): Branch {
    return this.bankSubsidiaries.find(
      branch => sellingPointCode === branch.sellingPointCode
    );
  }

  /**
   * Get Manegers for an specific selling point
   * @param idSellingPoint  id of selling point
   */
  private getManager(sellingpointCode: string) {
    const idSellingPoint = this.getIdSellingPoint(sellingpointCode)
      .idSellingPoint;
    this.sellingPointService.getManager(idSellingPoint).subscribe(res => {
      if (res) {
        this.setGestor(res);
      }
    });
  }

  /**
   * Do the map if have manager,
   * @param res List of gestor
   */
  private setGestor(res: Gestor) {
    if (res.concierges.length > 0) {
      this.bankManager = res.concierges.map(value => ({
        id: value.idConcierges,
        description: value.name
      }));
      this.hasManager = true;
      this.manager.setValidators([Validators.required]);
    } else {
      this.hasManager = false;
      this.toastService.add(
        this.translate.instant('@No Associate Manager'),
        ToastType.warning
      );
      this.manager.setValidators(null);
    }
    this.manager.updateValueAndValidity();
  }

  /**
   * Build payload
   */
  private generatePayload() {
    const accountValues = {
      accountDTO: {
        accountNumber: this.openAccount
          ? null
          : Number(this.accountNumber.value),
        isNewAccount: this.openAccount
      },
      sellingPointDTO: {
        id:
          this.openAccount || !this.accountHolder
            ? this.getIdSellingPoint(this.sellingPoint.value).idSellingPoint
            : Number(this.searchSellingPointAccount(this.accountNumber.value))
      },
      conciergeDTO: {
        id: this.manager.value ? Number(this.manager.value) : null
      }
    };
    return accountValues;
  }

  /**
   *  return the branch for the selected account
   * @param selectedAccount account number
   */
  public searchSellingPointAccount(selectedAccount): string {
    let branch;
    this.bankAccounts.forEach(value => {
      if (Number(value.id) === Number(selectedAccount)) {
        branch = value.branch;
      }
    });
    return branch;
  }

  /**
   * load data from proposal
   */
  public loadProposal() {
    const payload = this.generatePayload();
    this.proposal.account = {
      ...payload
    };
  }

  private closeRedirect() {
    this.dispatchPhaseAction();
  }

  private dispatchPhaseAction() {
    this.store.dispatch(
      new CheckPhaseAction({
        proposalId: this.proposalDTO.proposalNumber
      })
    );
  }

  public onSubmit() {
    const type = 'account';
    this.formSubmitted = true;
    if (this.accountForm.valid) {
      this.loadProposal();

      this.accountPartialProposal = {
        ...this.proposal.account
      };

      this.proposalService
        .postProposalAccount(
          this.accountPartialProposal,
          this.proposalDTO.proposalNumber,
          type
        )
        .subscribe(() => {
          if (this.isManageableRejection) {
            const modalRef = this.modalService.warning(
              this.translate.instant(
                '@MSG_Your proposal was sent for analysis'
              ),
              '',
              [
                {
                  label: this.translate.instant('@Accept'),
                  action: () => this.dispatchPhaseAction(),
                  type: 'secondary'
                }
              ],
              () => this.dispatchPhaseAction()
            );
            const m = modalRef.componentInstance as ModalComponent;
            m.modalCloseOutput.subscribe((f: () => void) => f());
            m.modalOutput.subscribe((f: () => void) => f());
          } else {
            this.dispatchPhaseAction();
          }
        });
    }
  }

  return(): void {
    this.router.navigate([
      `proposal/data-register/vehicle/${this.proposalDTO.proposalNumber}`
    ]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
