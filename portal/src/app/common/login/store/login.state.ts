import { createFeatureSelector } from '@ngrx/store';
import { UserData } from '../models/state/user-data';
import { UserSellingPoint } from '../models/state/selling-point';

export interface LoginState {
  userData: UserData;
  userSellingPoints: UserSellingPoint[];
}

export const initialLoginState: LoginState = {
  userData: null,
  userSellingPoints: []
};

export const loginSelector = createFeatureSelector<LoginState>('login');
