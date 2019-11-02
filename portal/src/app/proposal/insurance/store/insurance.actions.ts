import { Action } from '@ngrx/store';
import { InsurancePlanState, InsuranceState } from './insurance.state';

export enum InsuranceActionTypes {
  GET_PLANS = '[Insurance] [App] Get Plans',
  PLANS_LOADED = '[Insurance] [App] Plans Loaded',
  CHANGE_PLAN = '[Insurance] [User] Change Plan',
  GET_PLAN_DETAILS = '[Insurance] [User] Get Plan Details',
  PLAN_DETAILS_LOADED = '[Insurance] [App] Plan Details Loaded',
  SUBMIT_SELECTED_PLAN = '[Insurance] [User] Submit Selected Plan',
  SELECTED_PLAN_IS_MANUAL_QUOTATION = '[Insurance] [App] Selected Plan Is Manual Quotation',
  RESET_INSURANCE = '[Insurance] [App] Reset Insurance'
}

export class GetPlansAction implements Action {
  readonly type = InsuranceActionTypes.GET_PLANS;
  constructor(public proposalNumber: string) {}
}

export class PlansLoadedAction implements Action {
  readonly type = InsuranceActionTypes.PLANS_LOADED;
  constructor(public insurancePlans: InsuranceState) {}
}

export class ChangePlanAction implements Action {
  readonly type = InsuranceActionTypes.CHANGE_PLAN;
  constructor(public plan: InsurancePlanState) {}
}

export class GetPlanDetailsAction implements Action {
  readonly type = InsuranceActionTypes.GET_PLAN_DETAILS;
  constructor(public plan: InsurancePlanState, public proposalNumber: string) {}
}

export class PlanDetailsLoadedAction implements Action {
  readonly type = InsuranceActionTypes.PLAN_DETAILS_LOADED;
  constructor(public plan: InsurancePlanState, public planDetails: string) {}
}

export class SubmitSelectedPlanAction implements Action {
  readonly type = InsuranceActionTypes.SUBMIT_SELECTED_PLAN;
  constructor(
    public proposalNumber: string,
    public selectedPlan: InsurancePlanState
  ) {}
}

export class SelectedPlanIsManualQuotationAction implements Action {
  readonly type = InsuranceActionTypes.SELECTED_PLAN_IS_MANUAL_QUOTATION;
  constructor(public status: string, public proposalNumber: string) {}
}

export class ResetInsuranceAction implements Action {
  readonly type = InsuranceActionTypes.RESET_INSURANCE;
  constructor() {}
}

export type InsuranceActions =
  | GetPlansAction
  | PlansLoadedAction
  | GetPlanDetailsAction
  | PlanDetailsLoadedAction
  | SubmitSelectedPlanAction
  | SelectedPlanIsManualQuotationAction
  | ChangePlanAction
  | ResetInsuranceAction;
