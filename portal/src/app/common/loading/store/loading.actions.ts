import { Action } from '@ngrx/store';
import { HttpRequest } from '@angular/common/http';

/**
 * Action Types
 */
export enum LoadingActionTypes {
  ADD_REQUEST = '[Loading] Add Ongoing Request',
  REMOVE_REQUEST = '[Loading] Remove Ongoing Request'
}

/**
 * Payload Type
 */
export interface LoadingActionPayload {
  id: string;
  request: HttpRequest<any>;
}

/**
 * Action Classes
 */

export class AddRequestAction implements Action {
  readonly type = LoadingActionTypes.ADD_REQUEST;
  constructor(public payload: LoadingActionPayload) {}
}

export class RemoveRequestAction implements Action {
  readonly type = LoadingActionTypes.REMOVE_REQUEST;
  constructor(public payload: LoadingActionPayload) {}
}

export type LoadingAction = AddRequestAction | RemoveRequestAction;
