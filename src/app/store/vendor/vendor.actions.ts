import { IVendor } from './../../inferfaces/vendor';
import { Action } from '@ngrx/store';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';


export const LOAD_VENDORS = '[Vendor] Load Vendor';
export const LOAD_VENDORS_SUCCESS = '[Vendors] Load Vendor Succces';

export const LOAD_VENDORS_LIST = '[Vendor] Load Vendor List';
export const LOAD_VENDORS_LIST_SUCCESS = '[Vendor] Load Vendor List Succces';

export const SAVE_VENDOR = '[Vendor] Save Vendor';
export const SAVE_VENDOR_SUCCESS = '[Vendor] Save Vendor Succces';

export const UPDATE_VENDOR  = '[Vendor] Update Vendor';
export const UPDATE_VENDOR_SUCCESS = '[Vendor] Update Vendor Succces';

export const DELETE_VENDOR = '[Vendor] Delete Vendor';
export const DELETE_VENDOR_SUCCESS = '[Vendors] Delete Vendor Succces';

export const VENDOR_ERROR = '[Vendor] Vendor Error';

export const SET_PAGINATION = '[Vendor] Set Pagination Data';
export const CHANGE_PAGINATION = '[Vendor] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Vendor] Change Search Value';


export class LoadVendorsAction implements Action {
    readonly type = LOAD_VENDORS;
    constructor() {}
}

export class LoadVendorsSuccessAction implements Action {
    readonly type = LOAD_VENDORS_SUCCESS;
    constructor(public payload: IVendor[]) {}
}

export class LoadVendorsListAction implements Action {
    readonly type = LOAD_VENDORS_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadVendorsListSuccessAction implements Action {
    readonly type = LOAD_VENDORS_LIST_SUCCESS;
    constructor(public payload: IVendor[]) {}
}


export class SaveVendorAction implements Action {
    readonly type = SAVE_VENDOR;
    constructor(public payload: IVendor) {
    }
}

export class SaveVendorSuccessAction implements Action {
    readonly type = SAVE_VENDOR_SUCCESS;
    constructor() {}
}

export class UpdateVendorAction implements Action {
    readonly type = UPDATE_VENDOR;
    constructor(public payload: IVendor) {
    }
}

export class UpdateVendorSuccessAction implements Action {
    readonly type = UPDATE_VENDOR_SUCCESS;
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

export class DeleteVendorAction implements Action {
    readonly type = DELETE_VENDOR;
    constructor(public payload: IVendor) {
    }
}

export class DeleteVendorSuccessAction implements Action {
    readonly type = DELETE_VENDOR_SUCCESS;
    constructor() {}
}

export class VendorErrorAction implements Action {
    readonly type = VENDOR_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadVendorsAction
    | LoadVendorsSuccessAction
    | LoadVendorsListAction
    | LoadVendorsListSuccessAction
    | SaveVendorAction
    | SaveVendorSuccessAction
    | UpdateVendorAction
    | UpdateVendorSuccessAction
    | DeleteVendorAction
    | DeleteVendorSuccessAction
    | VendorErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

