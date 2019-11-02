import { Action } from '@ngrx/store';
import { UserData } from '../models/state/user-data';
import { UserSellingPoint } from '../models/state/selling-point';

/**
 * Action Types
 */
export enum LoginActionTypes {
  USER_DATA_LOAD = '[Login] Loading User Data',
  USER_SELLING_POINTS_REMOTE_LOAD = '[Login] [Remote-Load-Start] User Selling Points',
  USER_SELLING_POINTS_REMOTE_LOADED = '[Login] [Remote-Load-End] User Selling Points',
  LOG_OUT = '[Login] Logging Out',
  CLOSE_SESSION = '[Login] Close Session'
}

export class LoadUserDataAction implements Action {
  readonly type = LoginActionTypes.USER_DATA_LOAD;
  constructor(public userData: UserData) {}
}

export class LogoutAction implements Action {
  readonly type = LoginActionTypes.LOG_OUT;
}

export class CloseSessionAction implements Action {
  readonly type = LoginActionTypes.CLOSE_SESSION;
  constructor(public message: string = '') {}
}

export class UserSellingPointsLoadAction implements Action {
  readonly type = LoginActionTypes.USER_SELLING_POINTS_REMOTE_LOAD;
  constructor(public sellingPointsId: number[], public userId: number) {}
}

export class UserSellingPointsLoadEndedAction implements Action {
  readonly type = LoginActionTypes.USER_SELLING_POINTS_REMOTE_LOADED;
  constructor(public sellingPoints: UserSellingPoint[]) {}
}

export type LoginActions =
  | LoadUserDataAction
  | LogoutAction
  | CloseSessionAction
  | UserSellingPointsLoadEndedAction
  | UserSellingPointsLoadAction;
