import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducers';
import * as fromSnackbar from './snackbar/snackbar.reducers';
import * as fromAuthUser from './auth/auth.reducers';


export interface State {
    user: fromUser.UserState;
    snackbar: fromSnackbar.SnackbarState;
    auth: fromAuthUser.UserState;

}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.UserReducer,
    snackbar: fromSnackbar.SnackbarReducer,
    auth: fromAuthUser.AuthReducer
};

export const getUserState = (state: State) => state.user;
export const getSnackbarState = (state: State) => state.snackbar;
export const getAuthState = (state: State) => state.auth;

// Auth Selectors
export const getUser = createSelector(getAuthState, fromAuthUser.getUser);
export const getIsLogged = createSelector(getAuthState, fromAuthUser.getIsLogged);
export const getToken = createSelector(getAuthState, fromAuthUser.getToken);
export const getRole = createSelector(getAuthState, fromAuthUser.getRole);
export const getIsLoadingAuth = createSelector(getAuthState, fromAuthUser.getIsLoading);

// User selectors
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUsersList = createSelector(getUserState, fromUser.getUsersList);
export const getIsLoadingUsers = createSelector(getUserState, fromUser.getIsLoadingUsers);
export const getIsLoadingUser = createSelector(getUserState, fromUser.getIsLoadingUser);
export const getPaginationUser = createSelector(getUserState, fromUser.getPagination);

// Snackbar selectors
export const getNewMessage = createSelector(getSnackbarState, fromSnackbar.getNewMessage);

