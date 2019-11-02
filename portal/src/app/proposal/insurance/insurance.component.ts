import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/common/modal/modal.service';
import { MANUAL_QUOTATION } from '@app/constants/insurance.constants';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { proposalIdSelector } from '../state/proposal.selectors';
import {
  ChangePlanAction,
  GetPlanDetailsAction,
  GetPlansAction,
  SubmitSelectedPlanAction,
  ResetInsuranceAction
} from './store/insurance.actions';
import {
  insuranceSelector,
  selectedPlanSelector
} from './store/insurance.selectors';
import { InsurancePlanState, InsuranceState } from './store/insurance.state';

registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit, OnDestroy {
  private _proposalNumber: string;
  public insurance: InsuranceState;
  public selectedPlan: InsurancePlanState;
  // Aux booleans
  public isRetry: boolean = false;
  public isSubmitDisabled: boolean = true;
  public isExpanded: boolean = false;
  public isSameRow: boolean;
  // Constants
  public MQ: string = MANUAL_QUOTATION;
  // Subject to remove subscriptions on destroy hook
  protected ngUnsubscribe: Subject<any> = new Subject();
  // Table
  @ViewChild('myTable') table: DatatableComponent;

  constructor(
    private ar: ActivatedRoute,
    private store: Store<any>,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.store
      .select(insuranceSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(insurance => {
        this.insurance = insurance;
        this.isRetry = this.insurance.plans.length < 1 ? true : false;
      });

    this.store
      .select(selectedPlanSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(plan => {
        if (!plan) return;
        const isManualQuotation = plan.productCode === MANUAL_QUOTATION;
        this.isExpanded = false;
        if (!isManualQuotation) this.expandOrCollapseRow(plan, this.isExpanded);
        this.selectedPlan = { ...plan };
        this.isSubmitDisabled = false;
      });

    this.store
      .select(proposalIdSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(id => {
        if (!Number(id)) return;
        this._proposalNumber = id;
        this.store.dispatch(new GetPlansAction(this._proposalNumber));
      });

    this.ar.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(param => {
      if (this._proposalNumber !== param.proposal) {
        this.store.dispatch(new ResetInsuranceAction());
      }
    });
  }

  /**
   * onActivate handler method
   * @param event onActivate ngx datatable event, has no type.
   */
  onActivate(event: any): void {
    if (event.type !== 'click') return;
    const plan: InsurancePlanState = event.row;
    const sId = this.selectedPlan ? this.selectedPlan.planId : null;
    const desc = plan.fullDescription;
    const isManualQuotation = plan.productCode === MANUAL_QUOTATION;
    this.isSameRow = plan.planId === sId ? true : false;
    if (!this.isSameRow && !desc && !isManualQuotation) {
      this.store.dispatch(new GetPlanDetailsAction(plan, this._proposalNumber));
    }
    if (!this.isSameRow && (desc || isManualQuotation)) {
      this.store.dispatch(new ChangePlanAction(plan));
    }
    if (this.isSameRow && !isManualQuotation) {
      this.isExpanded = !this.isExpanded;
      this.expandOrCollapseRow(plan, this.isExpanded);
    }
  }

  /**
   * Method to expand/collapse given row, needs timeout given
   * that the table component resets when data changes
   * @param plan Selected insurance plan
   * @param expanded Boolean that determines if row is expanded/collapsed
   */
  expandOrCollapseRow(plan: InsurancePlanState, expanded: boolean): void {
    this.table.rowDetail.collapseAllRows();
    setTimeout(() => {
      if (!expanded) this.table.rowDetail.toggleExpandRow(plan);
    }, 0);
  }

  /**
   * Retry button handler
   */
  retry(): void {
    this.store.dispatch(new GetPlansAction(this._proposalNumber));
  }

  /**
   * Submit button handler
   */
  submit() {
    this.isSubmitDisabled = true;
    if (this.selectedPlan) {
      this.store.dispatch(
        new SubmitSelectedPlanAction(this._proposalNumber, this.selectedPlan)
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
