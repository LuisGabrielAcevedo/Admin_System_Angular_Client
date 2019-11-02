import { Action } from '@ngrx/store';

export const BLOCKING_HIDE = '[BLOCKING] HIDE';
export const BLOCKING_SHOW = '[BLOCKING] SHOW';

export class HideBlockingAction implements Action {
  readonly type = BLOCKING_HIDE;

  constructor() {}
}
export class ShowBlockingAction implements Action {
  readonly type = BLOCKING_SHOW;

  constructor(public payload: { message?: string }) {}
}

export type BlockingAction = HideBlockingAction | ShowBlockingAction;
