import {
  InsuranceActions,
  InsuranceActionTypes,
  PlanDetailsLoadedAction
} from './insurance.actions';
import {
  InsuranceState,
  InsurancePlanState,
  initialInsuranceState
} from './insurance.state';

export function insuranceReducer(
  state: InsuranceState = initialInsuranceState,
  action: InsuranceActions
): InsuranceState {
  switch (action.type) {
    case InsuranceActionTypes.PLANS_LOADED:
      return { ...state, ...action.insurancePlans };
    case InsuranceActionTypes.CHANGE_PLAN:
      return { ...state, selectedPlan: action.plan };
    case InsuranceActionTypes.PLAN_DETAILS_LOADED:
      return { ...state, plans: planDetailsReducer(state, action) };
    case InsuranceActionTypes.RESET_INSURANCE:
      return { ...initialInsuranceState };
    default:
      return state;
  }
}

export function planDetailsReducer(
  state: InsuranceState,
  action: PlanDetailsLoadedAction
): InsurancePlanState[] {
  const statePlans = [...state.plans];
  const mappedPlans = statePlans.map(plan => {
    if (plan.planId === action.plan.planId) {
      plan.fullDescription = action.planDetails;
    }
    return plan;
  });
  return mappedPlans;
}
