import * as CartActions from "./cart.actions";
import { ECartTabActive, IOrder, orderDefault } from "src/app/inferfaces/admin-system/order";

export interface CartState {
  tabActive: ECartTabActive;
  order: IOrder;
  company: any;
  loading: boolean;
}

export const initialState: CartState = {
  tabActive: ECartTabActive.productList,
  loading: false,
  company: null,
  order: orderDefault
};

export const getTabActive = (state: CartState) => state.tabActive;
export const getOrder = (state: CartState) => state.order;
export const getLoading = (state: CartState) => state.loading;
export const getCompany = (state: CartState) => state.company;

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
