import * as CartActions from "./cart.actions";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

export interface CartState {
  tabActive: ECartTabActive;
  loading: boolean;
}

export const initialState: CartState = {
  tabActive: ECartTabActive.productList,
  loading: false
};

export const getTabActive = (state: CartState) => state.tabActive;

export function CartReducer(
  state = initialState,
  action: CartActions.Actions
): CartState {
  switch (action.type) {
    case CartActions.CART_SET_TAB_ACTIVE: {
      return {
        ...state,
        tabActive: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
