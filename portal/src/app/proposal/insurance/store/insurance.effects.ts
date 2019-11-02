import { Injectable } from '@angular/core';
import { ModalComponent, ModalService } from '@app/common/modal';
import { CheckPhaseAction } from '@app/common/phase/state/phase.actions';
import { STATUS_RESPONSE } from '@app/constants/insurance.constants';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { NEVER } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { InsuranceService } from '../services/insurance.service';
import { PlansService } from '../services/plans.service';
import {
  ChangePlanAction,
  GetPlanDetailsAction,
  GetPlansAction,
  InsuranceActionTypes,
  PlanDetailsLoadedAction,
  PlansLoadedAction,
  SelectedPlanIsManualQuotationAction,
  SubmitSelectedPlanAction
} from './insurance.actions';

@Injectable()
export class InsuranceEffects {
  constructor(
    private actions: Actions,
    private plansService: PlansService,
    private insuranceService: InsuranceService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  @Effect()
  getPlansAction = this.actions.pipe(
    ofType<GetPlansAction>(InsuranceActionTypes.GET_PLANS),
    mergeMap(action =>
      this.plansService.getPlans(action.proposalNumber).pipe(
        map(response => new PlansLoadedAction(response)),
        catchError(error => NEVER)
      )
    )
  );

  @Effect()
  getPlanDetailsAction = this.actions.pipe(
    ofType<GetPlanDetailsAction>(InsuranceActionTypes.GET_PLAN_DETAILS),
    mergeMap(action =>
      this.plansService.getPlanDetails(action.plan, action.proposalNumber).pipe(
        map(response => new PlanDetailsLoadedAction(action.plan, response)),
        catchError(error => NEVER)
      )
    )
  );

  @Effect()
  planDetailsLoadedAction = this.actions.pipe(
    ofType<PlanDetailsLoadedAction>(InsuranceActionTypes.PLAN_DETAILS_LOADED),
    map(action => new ChangePlanAction(action.plan))
  );

  @Effect()
  submitSelectedPlanAction = this.actions.pipe(
    ofType<SubmitSelectedPlanAction>(InsuranceActionTypes.SUBMIT_SELECTED_PLAN),
    mergeMap(action =>
      this.insuranceService
        .postInsurance(action.proposalNumber, action.selectedPlan)
        .pipe(
          map(response => {
            if (response === STATUS_RESPONSE.HOLD) {
              return new SelectedPlanIsManualQuotationAction(
                response,
                action.proposalNumber
              );
            }
            return new CheckPhaseAction({ proposalId: action.proposalNumber });
          })
        )
    ),
    catchError(error => NEVER)
  );

  @Effect()
  selectedPlanIsManualQuotationAction = this.actions.pipe(
    ofType<SelectedPlanIsManualQuotationAction>(
      InsuranceActionTypes.SELECTED_PLAN_IS_MANUAL_QUOTATION
    ),
    switchMap(action => {
      const modalRef = this.modalService.success(
        this.translate.instant(
          '@Your proposal will be sent to the bank for manual quotation. Please, wait for a response to continue'
        ),
        undefined,
        undefined,
        () => new CheckPhaseAction({ proposalId: action.proposalNumber }),
        true
      );
      const m = (modalRef.componentInstance as ModalComponent).modalCloseOutput;
      return m.pipe(switchMap((f: () => void) => [f()]));
    })
  );
}
