import * as AuthActions from "./auth.actions";
import { IUser } from "../../inferfaces/user";

export interface UserState {
  user: IUser;
  isLogged: boolean;
  isLoading: boolean;
  token: string;
  role: any;
}

export const initialState: UserState = {
  user: null,
  isLogged: false,
  isLoading: false,
  token: null,
  role: null
};

export const getUser = (state: UserState) => state.user;
export const getIsLogged = (state: UserState) => state.isLogged;
export const getToken = (state: UserState) => state.token;
export const getRole = (state: UserState) => state.role;
export const getIsLoading = (state: UserState) => state.isLoading;

export function AuthReducer(
  state = initialState,
  action: AuthActions.Actions
): UserState {
  switch (action.type) {
    case AuthActions.AUTH_USER: {
      return Object.assign({}, state, {
        isLoading: true
      });
    }
    case AuthActions.AUTH_USER_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    }
    case AuthActions.AUTH_ERROR: {
      return Object.assign({}, state, {
        isLoading: false
      });
    }
    default: {
      return state;
    }
  }
}
