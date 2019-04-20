import { ILocal } from './../../inferfaces/local';
import { Action } from '@ngrx/store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { IApplication } from '../../inferfaces/application';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { ICompany } from '../../inferfaces/company';

export const LOAD_LOCALS = '[Local] Load Locals';
export const LOAD_LOCALS_SUCCESS = '[Local] Load Locals Succces';

export const LOAD_LOCALS_LIST = '[Local] Load Locals List';
export const LOAD_LOCALS_LIST_SUCCESS = '[Local] Load Locals List Succces';

export const SAVE_LOCAL = '[Local] Save Local';
export const SAVE_LOCAL_SUCCESS = '[Local] Save Local Succces';

export const UPDATE_LOCAL = '[Local] Update Local';
export const UPDATE_LOCAL_SUCCESS = '[Local] Update Local Succces';

export const DELETE_LOCAL = '[Local] Delete Local';
export const DELETE_LOCAL_SUCCESS = '[Local] Delete Local Succces';

export const LOCAL_ERROR = '[Local] Local Error';

export const SET_PAGINATION = '[Local] Set Pagination Data';
export const CHANGE_PAGINATION = '[Local] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Local] Change Search Value';

export const RESET_LOAD_REQUEST = '[Local] Reset Load Request';
export const RESET_LOAD_REQUEST_SUCCESS = '[Local] Reset Load Request Success';

export class LoadLocalsAction implements Action {
    readonly type = LOAD_LOCALS;
    constructor() {
    }
}

export class LoadLocalsSuccessAction implements Action {
    readonly type = LOAD_LOCALS_SUCCESS;
    constructor(public payload: ILocal[]) {}
}

export class LoadLocalsListAction implements Action {
    readonly type = LOAD_LOCALS_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadLocalsListSuccessAction implements Action {
    readonly type = LOAD_LOCALS_LIST_SUCCESS;
    constructor(public payload: ILocal[]) {}
}

export class SaveLocalAction implements Action {
    readonly type = SAVE_LOCAL;
    constructor(public payload: ILocal) {
    }
}

export class SaveLocalSuccessAction implements Action {
    readonly type = SAVE_LOCAL_SUCCESS;
    constructor() {}
}

export class UpdateLocalAction implements Action {
    readonly type = UPDATE_LOCAL;
    constructor(public payload: ILocal ) {
    }
}

export class UpdateLocalSuccessAction implements Action {
    readonly type = UPDATE_LOCAL_SUCCESS;
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

export class DeleteLocalAction implements Action {
    readonly type = DELETE_LOCAL;
    constructor(public payload: ILocal) {
    }
}

export class DeleteLocalSuccessAction implements Action {
    readonly type = DELETE_LOCAL_SUCCESS;
    constructor() {}
}

export class LocalErrorAction implements Action {
    readonly type = LOCAL_ERROR;
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
    = LoadLocalsAction
    | LoadLocalsSuccessAction
    | LoadLocalsListAction
    | LoadLocalsListSuccessAction
    | SaveLocalAction
    | SaveLocalSuccessAction
    | UpdateLocalAction
    | UpdateLocalSuccessAction
    | DeleteLocalAction
    | DeleteLocalSuccessAction
    | LocalErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction
    | ResetLoadRequestAction
    | ResetLoadRequestSuccessAction;
