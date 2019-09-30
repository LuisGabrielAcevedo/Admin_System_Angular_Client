import { Action } from "@ngrx/store";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

export const CART_SET_TAB_ACTIVE = "[Cart] Cart Set Tab Active";
export const CART_ADD_ITEM = "[Cart] Cart Add Item";

export class SetTabActiveAction implements Action {
  readonly type = CART_SET_TAB_ACTIVE;
  constructor(public payload: ECartTabActive) {}
}

export class SetAddItemAction implements Action {
  readonly type = CART_ADD_ITEM;
  constructor(public payload: boolean) {}
}

export type Actions = SetTabActiveAction | SetAddItemAction;
