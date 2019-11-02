import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InsuranceState } from './insurance.state';

export const insuranceSelector = createFeatureSelector<InsuranceState>(
  'insurance'
);

export const selectedPlanSelector = createSelector(
  insuranceSelector,
  state => state.selectedPlan
);
