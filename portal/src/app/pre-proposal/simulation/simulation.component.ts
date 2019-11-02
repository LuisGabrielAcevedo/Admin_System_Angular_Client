import { ModalService } from './../../common/modal/modal.service';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, delay } from 'rxjs/operators';
import { CheckPhaseAction } from '../../common/phase/state/phase.actions';
import { ProposalService } from '../../proposal/proposal.service';
import { LoadProposalSuccessAction } from '../../proposal/state/proposal.actions';
import { CouponResponse } from '../api/couponResponse';
import { Identification } from '../api/identification';
import { Indexer } from '../api/indexer';
import { InstallmentValue } from '../api/installmentValue';
import { SimulationModelsService } from '../services/simulation-models.service';
import { SimulationService } from '../services/simulation.service';
import { riskEngineSelector } from '../store/risk-engine.state';
import { EXPIRED_TOKEN_MESSAGE } from '@app/constants/error.constants';

registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('noSlider') noSlider;

  private riskEngineMinTerm: number;
  private riskEngineMaxTerm: number;
  private ratesInformation;

  public typeOfSimulation: TypeOfLoan = TypeOfLoan.Traditional;
  public simulationType = 'TRD';
  public simulationForm: FormGroup;
  public dueDateForm: FormGroup;
  protected ngUnsubscribe: Subject<any> = new Subject();
  public maxAmountReleased = 0;
  public incoming = 0;
  public matrixCode: string;
  public maxInstallmentValue;
  public purchaseValue = 1;
  public minValue = 0;
  public daysList = [];
  public setInstallment: boolean = true;
  public couponIsActive: boolean = false;
  public identification: Identification;
  public headerData: any;
  public indexer: Indexer;
  public installmentValues: InstallmentValue;
  public terms: Array<number> = [0];
  public coupon: Array<CouponResponse> = [];
  public coupons: Array<any> = [];
  public proposal;
  public percentageRate;
  public reason: string = null;
  public isSubmitDisabled: boolean = false;

  constructor(
    private simulationService: SimulationService,
    private simulationModelsService: SimulationModelsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private decimalPipe: DecimalPipe,
    private proposalService: ProposalService,
    private translate: TranslateService,
    private modalService: ModalService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store
      .select(riskEngineSelector)
      .pipe(
        delay(10),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(store => {
        if (store && store.data && store.data.reason) {
          this.reason = store.data.reason;
          const modalRef = this.modalService.warning(
            this.translate.instant(
              '@Because your profile, you will be asked to attach additional documentation later. Do you wish to continue?'
            ),
            '',
            [
              {
                label: this.translate.instant('@Cancel'),
                action: () => this.closeRedirect(),
                type: 'outline-secondary'
              },
              {
                label: this.translate.instant('@Continue'),
                type: 'secondary'
              }
            ]
          );
          modalRef.componentInstance.modalOutput.subscribe(
            (action: () => void) => {
              if (action) action();
            }
          );
        }
      });

    this.editableFields();
    this.identification = this.simulationModelsService.identificationModel();
    this.indexer = this.simulationModelsService.indexerModel();
    this.installmentValues = this.simulationModelsService.installmentValuesModel();
    this.proposal = this.activeRoute.snapshot.params.simulation;
    this.getDaysOfMonth();

    this.downPaymentChanges();
    this.financedAmountChanges();
    this.simulationForm.get('coupon').valueChanges.subscribe(value => {
      this.couponIsActive = !(value === '');
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  closeRedirect() {
    this.router.navigate(['/pre-proposal/identification']);
  }

  ngAfterViewInit() {
    this.getIdentification(this.proposal);
  }

  get downPayment() {
    return this.simulationForm.get('downPayment') as FormControl;
  }

  get financedAmount() {
    return this.simulationForm.get('financedAmount') as FormControl;
  }

  get installment() {
    return this.simulationForm.get('installment') as FormControl;
  }

  private downPaymentChanges() {
    this.downPayment.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const min = this.purchaseValue - this.maxAmountReleased;
        let newValue = value;
        if (value < min) {
          newValue = min;
        }
        if (value > this.purchaseValue) {
          newValue = this.purchaseValue;
        }
        this.downPayment.setValue(newValue, { emitEvent: false });
        this.financedAmount.patchValue(this.purchaseValue - Number(newValue), {
          emitEvent: false
        });
        this.setInstallment = true;
        this.doSimulation();
      });
  }

  private financedAmountChanges() {
    this.financedAmount.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged()
      )
      .subscribe(value => {
        let newValue = value;
        if (value < this.minValue) {
          newValue = this.minValue;
        }
        if (value > this.maxAmountReleased) {
          newValue = this.maxAmountReleased;
        }
        this.financedAmount.setValue(newValue, { emitEvent: false });
        this.downPayment.patchValue(this.purchaseValue - Number(newValue), {
          emitEvent: false
        });
        this.setInstallment = true;
        this.doSimulation();
      });
  }

  /**
   * Get data from identification
   * @param proposal Number of proposal
   */
  private getIdentification(proposal: number) {
    this.simulationService.getIdentification(proposal).subscribe(res => {
      this.setIdentification(res);
    });
  }

  /**
   * Stores data of identification
   * * Tricky... For the first simulation we need to call identification, to retrieve the Risk Evaluation of the user.
   * @param identification Data from getIdentification
   */
  private setIdentification(identification: Identification) {
    if (!identification) {
      this.identification = this.simulationModelsService.identificationModel();
      return;
    }
    this.identification = identification;
    this.updateSimulationValues();
    // set header values
    this.headerData = this.getHeaderValues();
    this.getCoupon();
  }
  private updateSimulationValues(finalAmountFromCoupon = 0) {
    this.purchaseValue = this.identification.vehicle.purchaseValue;
    const risk = this.identification.scoring.riskEvaluation
      .riskEvaluationResultDTO;
    if (this.typeOfSimulation === TypeOfLoan.Uva) {
      this.riskEngineMinTerm = this.identification.scoring.riskEvaluation.riskEvaluationResultDTO.minInstallmentUVA;
      this.riskEngineMaxTerm = this.identification.scoring.riskEvaluation.riskEvaluationResultDTO.finalInstallmentUVA;
      if (!!finalAmountFromCoupon) {
        this.maxAmountReleased = finalAmountFromCoupon;
      } else {
        this.maxAmountReleased = risk.finalAmountUVA;
      }
      this.maxInstallmentValue = risk.finalInstallmentValueUVA;
      this.minValue = risk.minAmountUVA;
      this.ratesInformation = this.getRatesInformation(
        'UVA',
        this.identification.scoring.ratesProductViewDTOList
      );
      this.matrixCode = this.ratesInformation.matrixCode;
    } else if (this.typeOfSimulation === TypeOfLoan.Traditional) {
      this.riskEngineMinTerm = this.identification.scoring.riskEvaluation.riskEvaluationResultDTO.minInstallment;
      this.riskEngineMaxTerm = this.identification.scoring.riskEvaluation.riskEvaluationResultDTO.finalInstallment;
      if (!!finalAmountFromCoupon) {
        this.maxAmountReleased = finalAmountFromCoupon;
      } else {
        this.maxAmountReleased = risk.finalAmount;
      }
      this.maxInstallmentValue = risk.finalInstallmentValue;
      this.minValue = risk.minAmount;
      this.ratesInformation = this.getRatesInformation(
        'TRD',
        this.identification.scoring.ratesProductViewDTOList
      );
      this.matrixCode = this.ratesInformation.matrixCode;
    }

    // calculate the value of paymentValue
    this.incoming = this.purchaseValue - this.maxAmountReleased;
    this.percentageRate = this.ratesInformation.percentageRate;

    // set values to form
    this.simulationForm.patchValue(
      {
        financedAmount: this.maxAmountReleased,
        downPayment: this.incoming
      },
      { emitEvent: false }
    );
    this.doSimulation();
  }

  /**
   * Search and return the matrixCode and the percentageRate
   *@param type product type(UVA/TRD)
   *@param rate object of ratesProductViewDTOList
   */
  private getRatesInformation(type, rate) {
    let matrixCode: string = '';
    let percentageRate: number = 0;
    rate.forEach(element => {
      if (element.indexerType === type) {
        matrixCode = element.matrixCode;
        percentageRate = element.rates[0] ? element.rates[0].percentageRate : 0;
      }
    });
    return { matrixCode, percentageRate };
  }

  /**
   * Get indexer values
   *
   */
  private getIndexer() {
    this.simulationService
      .getIndexer(
        this.typeOfSimulation === 'UVA' ? this.typeOfSimulation : 'TRD'
      )
      .subscribe(res => {
        this.setIndexer(res);
      });
  }

  /**
   * Stores data of indexer
   * @param indexer Data from getIndexer
   */
  private setIndexer(indexer: Indexer) {
    this.indexer = indexer;
    this.getTerms();
  }

  /**
   * Get terms value
   *
   */
  private getTerms() {
    this.simulationService
      .getTerms(
        this.simulationForm.get('coupon').value
          ? this.simulationForm.get('coupon').value
          : this.matrixCode,
        this.simulationForm.get('financedAmount').value,
        this.maxInstallmentValue,
        this.riskEngineMinTerm,
        this.riskEngineMaxTerm
      )
      .subscribe(res => {
        this.setTerms(res); // Removed if to fix for demo
        this.getInstallmentValues(this.typeOfSimulation === 'UVA');
      });
  }

  /**
   * Stores data of terms
   * @param terms Data from getTerms
   */
  private setTerms(terms: any) {
    const termSelected = this.simulationForm.controls.installment.value;
    this.terms = terms; // receive terms in array
    this.terms = terms.reverse(); // reverse array order

    if (this.termIsSelected(termSelected)) {
      // check if there is selected term in array
      this.simulationForm.controls.installment.setValue(termSelected);
    } else {
      this.simulationForm.controls.installment.setValue(this.terms[0]);
    }
    this.setInstallment = false;

    this.getInstallmentValues(this.typeOfSimulation === 'UVA');
  }

  private termIsSelected(termSelected) {
    let foundTerm = false;
    this.terms.forEach(term => {
      if (term === termSelected) {
        foundTerm = true;
      }
    });
    return foundTerm;
  }

  /**
   *
   * @param isUva If the type is UVA we need to send 1 more parameter to the backend
   */
  private getInstallmentValues(isUva?: boolean) {
    this.simulationService
      .getInstallmentValues(
        this.simulationForm.get('coupon').value
          ? this.simulationForm.get('coupon').value
          : this.matrixCode,
        this.indexer.indexerCode,
        Number(this.simulationForm.get('financedAmount').value),
        Number(this.simulationForm.get('installment').value),
        isUva
      )
      .subscribe(res => {
        this.setInstallmentValues(res);
      });
  }

  /**
   * Stores data of terms
   * @param installment Data from getInstallmentValues
   */
  private setInstallmentValues(installmentValues: InstallmentValue) {
    this.installmentValues = installmentValues;
  }

  private getCoupon() {
    const storeId = this.identification.store.sellingPointCode;
    this.simulationService.getCoupon(storeId).subscribe(res => {
      this.setCoupon(res);
    });
  }

  private setCoupon(coupon: Array<CouponResponse>): void {
    this.coupon = coupon;
    this.setProductCoupons();
  }

  private setProductCoupons() {
    let newCoupons = [];
    if (this.typeOfSimulation === TypeOfLoan.Uva) {
      newCoupons = this.coupon.filter(element => element.indexerCode === 'UVA');
    } else {
      newCoupons = this.coupon.filter(element => element.indexerCode === 'TRD');
    }
    const arrays = newCoupons.map(element => element.coupons);
    const flattened = [].concat.apply([], arrays);

    this.coupons = flattened.map(element => ({
      value: element.coupon,
      label: element.description,
      finalAmount: element.financedAmount,
      ltv: element.ltv
    }));

    this.coupons.push({
      label: this.translate.instant('@None'),
      value: '',
      finalAmount: null,
      ltv: null
    });
  }

  public changeCoupon(coupon): void {
    const finalAmountFromCoupon = this.getCouponValue(coupon);
    this.updateSimulationValues(finalAmountFromCoupon);
  }

  private getCouponValue(coupon) {
    let finalAmountFromCoupon: number = 0;
    if (coupon.ltv && !coupon.finalAmount) {
      finalAmountFromCoupon = Number((coupon.ltv / 100) * this.purchaseValue);
    } else if (coupon.finalAmount && !coupon.ltv) {
      finalAmountFromCoupon = Number(coupon.finalAmount);
    }
    return finalAmountFromCoupon;
  }

  /**
   * Execute the init of simulation tree
   *
   */
  public doSimulation() {
    this.getIndexer();
  }

  public updateDownPaymentValueSlider(value) {
    this.simulationForm.patchValue(
      {
        financedAmount: Number(value),
        downPayment: this.purchaseValue - Number(value)
      },
      { emitEvent: false }
    );
    this.setInstallment = true;
    this.doSimulation();
  }

  public changedInstallment() {
    this.setInstallment = false;
    this.doSimulation();
  }

  /**
   * Change the simulation type
   * @param simulationType 0 for UVA and 1 For traditional, this come from the click of the button in HTML
   */
  public changeSimulationType(simulationType: string) {
    this.simulationForm.get('coupon').reset();
    this.couponIsActive = false;
    if (simulationType === 'UVA') {
      this.typeOfSimulation = TypeOfLoan.Uva;
    } else if (simulationType === 'Tradicional') {
      this.typeOfSimulation = TypeOfLoan.Traditional;
    }
    this.setInstallment = true;
    this.setProductCoupons();
    this.updateSimulationValues();
  }

  /**
   * Create the form of simulation and DueDate
   */
  private editableFields() {
    this.simulationForm = this.formBuilder.group(
      {
        downPayment: [0, { updateOn: 'blur' }],
        financedAmount: [0, { updateOn: 'blur' }],
        installment: [0],
        coupon: null,
        simulationType: 'TRD'
      },
      { updateOn: 'blur' }
    );

    this.dueDateForm = this.formBuilder.group({
      dueDate: [1]
    });
  }

  /**
   *  To get values to the Header
   */
  private getHeaderValues() {
    return {
      owner: { ...this.identification.customer },
      vehicle: { ...this.identification.vehicle },
      simulation: true
    };
  }

  public updateSliderDefaut() {
    const step = 1000;
    let value = this.simulationForm.controls.financedAmount.value;
    if (this.noSlider && this.noSlider.slider) {
      value /= step;
      value = ~~value * step;
      this.noSlider.slider.set(value);
      this.noSlider.slider.updateOptions(this.setSliderStepDefault());
    }
  }

  private setSliderStepDefault() {
    return {
      step: 1000
    };
  }

  private setSliderStep() {
    return {
      step: 1
    };
  }

  /**
   *  To get days of current month
   */
  private getDaysOfMonth() {
    for (let i = 1; i <= 28; i++) {
      this.daysList.push(i);
    }
  }

  private formatValues(value) {
    return `$ ${this.decimalPipe.transform(value, '0.0-0', 'es-AR')}`;
  }

  public formatFunction = this.formatValues.bind(this);

  private generatePayload() {
    const proposalValues = {
      simulationDTO: {
        coupon: this.simulationForm.get('coupon').value,
        financedAmount: this.financedAmount.value,
        matrixCode: this.matrixCode,
        terms: this.installment.value,
        dueDate: this.dueDateForm.get('dueDate').value
      },
      uuid: this.proposal
    };
    return proposalValues;
  }

  public onSubmit() {
    this.isSubmitDisabled = true;

    const payload = this.generatePayload();

    this.proposalService.postProposal(payload).subscribe(
      data => {
        if (data && data.ok) {
          const proposal = data.body;
          this.store.dispatch(new LoadProposalSuccessAction({ proposal }));

          this.store.dispatch(
            new CheckPhaseAction({
              proposalId: proposal.proposalNumber
            })
          );
        }
      },
      err => {
        this.isSubmitDisabled = false;
        if (err.error && err.error === EXPIRED_TOKEN_MESSAGE) {
          this.simulationService.tokenHasExpired();
        }
      }
    );
  }
}

export enum TypeOfLoan {
  Uva = 'UVA',
  Traditional = 'TRADICIONAL'
}
