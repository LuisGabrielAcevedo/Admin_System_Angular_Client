import { OnboardingData } from '../models/onboarding-data';
import { createFeatureSelector } from '@ngrx/store';

export interface RiskEngineState {
  data: OnboardingData;
}

export const initialRiskEngineState: RiskEngineState = { data: null };

export const riskEngineSelector = createFeatureSelector<RiskEngineState>(
  'riskEngine'
);
