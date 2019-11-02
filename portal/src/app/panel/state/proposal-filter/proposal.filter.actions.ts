import { Action } from '@ngrx/store';

export const CHANGE_FILTER_BY = '[FILTER_BY] CHANGE';

export class ChangeFilterByAction implements Action {
  readonly type = CHANGE_FILTER_BY;

  constructor(public payload: { filterBy: object }) {}
}

export type ProposalFilterActions = ChangeFilterByAction;
