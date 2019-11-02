import { ActionReducerMap } from '@ngrx/store';
import { RiskEngineState, initialRiskEngineState } from './risk-engine.state';
import {
  RisckEngineResponseAction,
  RiskEngineActionTypes
} from './risk-engine.actions';
import { OnboardingData } from '../models/onboarding-data';

export function dataReducer(
  state: OnboardingData = null,
  action: RisckEngineResponseAction
): OnboardingData {
  switch (action.type) {
    case RiskEngineActionTypes.RISK_ENGINE_RESPONSE:
      return { ...action.data };
    default:
      return state;
  }
}

export const riskEngineReducerMap: ActionReducerMap<RiskEngineState> = {
  data: dataReducer
};
