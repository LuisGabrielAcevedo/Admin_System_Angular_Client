import { Action } from '@ngrx/store';
import { OnboardingData } from '../models/onboarding-data';

export enum RiskEngineActionTypes {
  RISK_ENGINE_RESPONSE = '[Risk Engine] Response'
}

export class RisckEngineResponseAction implements Action {
  readonly type = RiskEngineActionTypes.RISK_ENGINE_RESPONSE;
  constructor(public data: OnboardingData) {}
}
