import { Action } from '@ngrx/store';
import { IUser } from '../../inferfaces/user';
import { ILoadRequest } from '../../inferfaces/loadRequest';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';

export const LOAD_USERS = '[User] Load Users';
export const LOAD_USERS_SUCCESS = '[User] Load Users Succces';

export const LOAD_USERS_LIST = '[User] Load Users List';
export const LOAD_USERS_LIST_SUCCESS = '[User] Load Users List Succces';

export const SAVE_USER = '[User] Save User';
export const SAVE_USER_SUCCESS = '[User] Save User Succces';

export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_SUCCESS = '[User] Update User Succces';

export const DELETE_USER = '[User] Delete User';
export const DELETE_USER_SUCCESS = '[User] Delete User Succces';

export const USER_ERROR = '[User] User Error';

export const SET_PAGINATION = '[User] Set Pagination Data';
export const CHANGE_PAGINATION = '[User] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[User] Change Search Value';

export const RESET_LOAD_REQUEST = '[User] Reset Load Request';
export const RESET_LOAD_REQUEST_SUCCESS = '[User] Reset Load Request Success';


export class LoadUsersAction implements Action {
    readonly type = LOAD_USERS;
    constructor() { }
}

export class LoadUsersSuccessAction implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: IUser[]) { }
}

export class LoadUsersListAction implements Action {
    readonly type = LOAD_USERS_LIST;
    constructor(public payload: ILoadRequest) { }
}

export class LoadUsersListSuccessAction implements Action {
    readonly type = LOAD_USERS_LIST_SUCCESS;
    constructor(public payload: IUser[]) { }
}

export class SaveUserAction implements Action {
    readonly type = SAVE_USER;
    constructor(public payload: IUser) {
    }
}

export class SaveLoadAction implements Action {
    readonly type = SAVE_USER;
    constructor(public payload: IUser) {
    }
}

export class SaveUserSuccessAction implements Action {
    readonly type = SAVE_USER_SUCCESS;
    constructor() {}
}


export class UpdateUserAction implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: { user: IUser, file: File } ) {
    }
}



export class UpdateUserSuccessAction implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor() {}
}

export class SetPaginationAction implements Action {
    readonly type = SET_PAGINATION;
    constructor(public payload: TablePagination) { }
}

export class ChangePaginationAction implements Action {
    readonly type = CHANGE_PAGINATION;
    constructor(public payload: TablePagination) { }
}

export class DeleteUserAction implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: IUser) {
    }
}

export class DeleteUserSuccessAction implements Action {
    readonly type = DELETE_USER_SUCCESS;
    constructor() {}
}

export class UserErrorAction implements Action {
    readonly type = USER_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export class ResetLoadRequestAction implements Action {
    readonly type = RESET_LOAD_REQUEST;
    constructor() {
    }
}

export class ResetLoadRequestSuccessAction implements Action {
    readonly type = RESET_LOAD_REQUEST_SUCCESS;
    constructor() {}
}

export type Actions
    = LoadUsersAction
    | LoadUsersSuccessAction
    | LoadUsersListAction
    | LoadUsersListSuccessAction
    | SaveUserAction
    | SaveUserSuccessAction
    | UpdateUserAction
    | UpdateUserSuccessAction
    | DeleteUserAction
    | DeleteUserSuccessAction
    | UserErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction
    | ResetLoadRequestAction
    | ResetLoadRequestSuccessAction;
