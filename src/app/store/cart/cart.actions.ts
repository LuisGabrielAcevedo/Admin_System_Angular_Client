import { Action } from "@ngrx/store";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

export const CART_SET_TAB_ACTIVE = "[Cart] Cart Set Tab Active";

export class SetTabActiveAction implements Action {
  readonly type = CART_SET_TAB_ACTIVE;
  constructor(public payload: ECartTabActive) {}
}

export type Actions = SetTabActiveAction;
