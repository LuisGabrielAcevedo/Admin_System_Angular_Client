import * as UserActions from "./user.actions";
import { IUser } from "../../inferfaces/user";
import { DynamicTablePagination } from "src/app/components/sharedComponents/table/table.interfaces";

export interface UserState {
  users: IUser[];
  usersList: IUser[];
  isLoadingUsers: boolean;
  isLoadingUser: boolean;
  pagination: DynamicTablePagination;
  rolList: any[];
  companyList: any[];
  applicationList: any[];
}

export const initialState: UserState = {
  users: [],
  usersList: [],
  isLoadingUsers: false,
  isLoadingUser: false,
  rolList: [],
  companyList: [],
  applicationList: [],
  pagination: null
};

export const getUsers = (state: UserState) => state.users;
export const getUsersList = (state: UserState) => state.usersList;
export const getIsLoadingUsers = (state: UserState) => state.isLoadingUsers;
export const getIsLoadingUser = (state: UserState) => state.isLoadingUser;
export const getCompaniesList = (state: UserState) => state.companyList;
export const getRolesList = (state: UserState) => state.rolList;
export const getApplicationsList = (state: UserState) => state.applicationList;
export const getPagination = (state: UserState) => state.pagination;

export function UserReducer(
  state = initialState,
  action: UserActions.Actions
): UserState {
  switch (action.type) {
    case UserActions.LOAD_USERS: {
      return Object.assign({}, state, {
        isLoadingUsers: true
      });
    }
    case UserActions.LOAD_USERS_SUCCESS: {
      return Object.assign({}, state, {
        isLoadingUsers: false,
        users: action.payload
      });
    }
    case UserActions.LOAD_USERS_LIST: {
      return Object.assign({}, state, {
        isLoadingUsers: true
      });
    }
    case UserActions.LOAD_USERS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        isLoadingUsers: false,
        usersList: action.payload
      });
    }

    case UserActions.SAVE_USER: {
      return Object.assign({}, state, {
        isLoadingUsers: true
      });
    }
    case UserActions.SAVE_USER_SUCCESS: {
      return Object.assign({}, state, {
        isLoadingUsers: false
      });
    }
    case UserActions.UPDATE_USER: {
      return Object.assign({}, state, {
        isLoadingUsers: true
      });
    }
    case UserActions.UPDATE_USER_SUCCESS: {
      return Object.assign({}, state, {
        isLoadingUsers: false
      });
    }
    case UserActions.DELETE_USER: {
      return Object.assign({}, state, {
        isLoadingUsers: true
      });
    }
    case UserActions.DELETE_USER_SUCCESS: {
      return Object.assign({}, state, {
        isLoadingUsers: false
      });
    }
    case UserActions.USER_ERROR: {
      return Object.assign({}, state, {
        isLoadingUsers: false
      });
    }
    case UserActions.SET_PAGINATION: {
      return Object.assign({}, state, {
        pagination: action.payload
      });
    }
    case UserActions.RESET_LOAD_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        pagination: null
      });
    }
    default: {
      return state;
    }
  }
}
