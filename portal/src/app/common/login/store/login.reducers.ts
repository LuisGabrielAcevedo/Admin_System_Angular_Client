import { LoginState } from './login.state';
import { ActionReducerMap } from '@ngrx/store';
import {
  LoginActions,
  LoginActionTypes,
  UserSellingPointsLoadEndedAction
} from './login.actions';

export function userDataReducer(state = null, action: LoginActions) {
  switch (action.type) {
    case LoginActionTypes.USER_DATA_LOAD:
      return {
        ...action.userData
      };

    case LoginActionTypes.LOG_OUT:
      return {};

    default:
      return state;
  }
}

export function userSellingPointsReducer(state = [], action: LoginActions) {
  switch (action.type) {
    case LoginActionTypes.USER_SELLING_POINTS_REMOTE_LOADED:
      return [...(action as UserSellingPointsLoadEndedAction).sellingPoints];
    case LoginActionTypes.LOG_OUT:
      return [];
    default:
      return state;
  }
}

/**
 * Reducer Map
 */

export const loginReducerMap: ActionReducerMap<LoginState> = {
  userData: userDataReducer,
  userSellingPoints: userSellingPointsReducer
};
