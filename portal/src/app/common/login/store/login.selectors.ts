import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';
import { UserSellingPoint } from '../models/state/selling-point';

export const loginSelector = createFeatureSelector<LoginState>('login');

export const userSellingPointsSelector = createSelector(
  loginSelector,
  (state: LoginState) => state.userSellingPoints
);

export const enabledUserSellingPointsSelector = createSelector(
  userSellingPointsSelector,
  (state: UserSellingPoint[]) =>
    state.filter(
      point =>
        point.features.sellingPointActive &&
        (point.features.carEnabled || point.features.utilitarianEnabled)
    )
);

export const userSelector = createSelector(
  loginSelector,
  (state: LoginState) => state.userData
);
