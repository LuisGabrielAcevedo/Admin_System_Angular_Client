import { Action } from '@ngrx/store';
import { ILicense } from 'src/app/inferfaces/license';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


export const LOAD_LICENSES = '[License] Load Licenses';
export const LOAD_LICENSES_SUCCESS = '[License] Load Licenses Succces';

export const SAVE_LICENSE = '[License] Save License';
export const SAVE_LICENSE_SUCCESS = '[License] Save License Succces';

export const UPDATE_LICENSE = '[License] Update License';
export const UPDATE_LICENSE_SUCCESS = '[License] Update License Succces';

export const DELETE_LICENSE = '[License] Delete License';
export const DELETE_LICENSE_SUCCESS = '[License] Delete License Succces';

export const LICENSE_ERROR = '[License] License Error';

export const SET_PAGINATION = '[License] Set Pagination Data';
export const CHANGE_PAGINATION = '[License] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[License] Change Search Value';

export class LoadLicensesAction implements Action {
    readonly type = LOAD_LICENSES;
    constructor() {
    }
}

export class LoadLicensesSuccessAction implements Action {
    readonly type = LOAD_LICENSES_SUCCESS;
    constructor(public payload: ILicense[]) {}
}


export class SaveLicenseAction implements Action {
    readonly type = SAVE_LICENSE;
    constructor(public payload: ILicense) {
    }
}

export class SaveLicenseSuccessAction implements Action {
    readonly type = SAVE_LICENSE_SUCCESS;
    constructor() {}
}

export class UpdateLicenseAction implements Action {
    readonly type = UPDATE_LICENSE;
    constructor(public payload: ILicense ) {
    }
}

export class UpdateLicenseSuccessAction implements Action {
    readonly type = UPDATE_LICENSE_SUCCESS;
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

export class DeleteLicenseAction implements Action {
    readonly type = DELETE_LICENSE;
    constructor(public payload: ILicense) {
    }
}

export class DeleteLicenseSuccessAction implements Action {
    readonly type = DELETE_LICENSE_SUCCESS;
    constructor() {}
}

export class LicenseErrorAction implements Action {
    readonly type = LICENSE_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}


export type Actions
    = LoadLicensesAction
    | LoadLicensesSuccessAction
    | SaveLicenseAction
    | SaveLicenseSuccessAction
    | UpdateLicenseAction
    | UpdateLicenseSuccessAction
    | DeleteLicenseAction
    | DeleteLicenseSuccessAction
    | LicenseErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

