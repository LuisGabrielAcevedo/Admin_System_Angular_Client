import { Action } from '@ngrx/store';
import { IAdmin } from '../../inferfaces/admin';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';

export const LOAD_ADMINS = '[Admin] Load Admins';
export const LOAD_ADMINS_SUCCESS = '[Admin] Load Admins Succces';

export const SAVE_ADMIN = '[Admin] Save Admin';
export const SAVE_ADMIN_SUCCESS = '[Admin] Save Admin Succces';

export const UPDATE_ADMIN = '[Admin] Update admin';
export const UPDATE_ADMIN_SUCCESS = '[Admin] Update Admin Succces';

export const DELETE_ADMIN = '[Admin] Delete Admin';
export const DELETE_ADMIN_SUCCESS = '[Admin] Delete Admin Succces';

export const ADMIN_ERROR = '[Admin] Admin Error';

export const SET_PAGINATION = '[Admin] Set Pagination Data';
export const CHANGE_PAGINATION = '[Admin] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Admin] Change Search Value';

export class LoadAdminsAction implements Action {
    readonly type = LOAD_ADMINS;
    constructor() {
    }
}

export class LoadAdminsSuccessAction implements Action {
    readonly type = LOAD_ADMINS_SUCCESS;
    constructor(public payload: IAdmin[]) {}
}

export class SaveAdminAction implements Action {
    readonly type = SAVE_ADMIN;
    constructor(public payload: IAdmin) {
    }
}

export class SaveAdminSuccessAction implements Action {
    readonly type = SAVE_ADMIN_SUCCESS;
    constructor() {}
}

export class UpdateAdminAction implements Action {
    readonly type = UPDATE_ADMIN;
    constructor(public payload: { admin: IAdmin, file: File } ) {
    }
}

export class UpdateAdminSuccessAction implements Action {
    readonly type = UPDATE_ADMIN_SUCCESS;
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

export class DeleteAdminAction implements Action {
    readonly type = DELETE_ADMIN;
    constructor(public payload: IAdmin) {
    }
}

export class DeleteAdminSuccessAction implements Action {
    readonly type = DELETE_ADMIN_SUCCESS;
    constructor() {}
}

export class AdminErrorAction implements Action {
    readonly type = ADMIN_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadAdminsAction
    | LoadAdminsSuccessAction
    | SaveAdminAction
    | SaveAdminSuccessAction
    | UpdateAdminAction
    | UpdateAdminSuccessAction
    | DeleteAdminAction
    | DeleteAdminSuccessAction
    | AdminErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

