import { Action } from '@ngrx/store';

export const SET_SELLING = '[Selling] SET';

export class SetSellingAction implements Action {
  readonly type = SET_SELLING;

  constructor(public payload: { sellingPoint: object }) {}
}

export type ProposalSellingctions = SetSellingAction;
