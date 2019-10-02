import { createSelector } from "reselect";
import { ActionReducerMap } from "@ngrx/store";

import * as fromAppSettings from "./app-settings/app-settings.reducer";
import * as fromCart from "./cart/cart.reducer";
import * as fromUser from "./user/user.reducers";
import * as fromSnackbar from "./snackbar/snackbar.reducers";
import * as fromAuthUser from "./auth/auth.reducers";

export interface State {
  user: fromUser.UserState;
  snackbar: fromSnackbar.SnackbarState;
  auth: fromAuthUser.UserState;
  appSettings: fromAppSettings.AppSettingsState;
  cart: fromCart.CartState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.UserReducer,
  snackbar: fromSnackbar.SnackbarReducer,
  auth: fromAuthUser.AuthReducer,
  appSettings: fromAppSettings.AppSettingsReducer,
  cart: fromCart.CartReducer
};

export const getUserState = (state: State) => state.user;
export const getSnackbarState = (state: State) => state.snackbar;
export const getAuthState = (state: State) => state.auth;
export const getAppSettingsState = (state: State) => state.appSettings;
export const getCartState = (state: State) => state.cart;

// App settings selectors
export const getRequests = createSelector(
  getAppSettingsState,
  fromAppSettings.getRequests
);

// Cart selector
export const getTabActive = createSelector(
  getCartState,
  fromCart.getTabActive
);
export const getLoading = createSelector(
  getCartState,
  fromCart.getLoading
);
export const getCompany = createSelector(
  getCartState,
  fromCart.getCompany
);
export const getOrder = createSelector(
  getCartState,
  fromCart.getOrder
);

// Auth selectors
export const getUser = createSelector(
  getAuthState,
  fromAuthUser.getUser
);
export const getIsLogged = createSelector(
  getAuthState,
  fromAuthUser.getIsLogged
);
export const getToken = createSelector(
  getAuthState,
  fromAuthUser.getToken
);
export const getRole = createSelector(
  getAuthState,
  fromAuthUser.getRole
);
export const getIsLoadingAuth = createSelector(
  getAuthState,
  fromAuthUser.getIsLoading
);

// User selectors
export const getUsers = createSelector(
  getUserState,
  fromUser.getUsers
);
export const getUsersList = createSelector(
  getUserState,
  fromUser.getUsersList
);
export const getIsLoadingUsers = createSelector(
  getUserState,
  fromUser.getIsLoadingUsers
);
export const getIsLoadingUser = createSelector(
  getUserState,
  fromUser.getIsLoadingUser
);
export const getPaginationUser = createSelector(
  getUserState,
  fromUser.getPagination
);

// Snackbar selectors
export const getNewMessage = createSelector(
  getSnackbarState,
  fromSnackbar.getNewMessage
);
