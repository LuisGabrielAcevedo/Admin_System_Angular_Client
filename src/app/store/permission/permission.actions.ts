import { IPermission } from './../../inferfaces/permission';
import { Action } from '@ngrx/store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';


export const LOAD_PERMISSIONS = '[Permission] Load Permissions';
export const LOAD_PERMISSIONS_SUCCESS = '[Permission] Load Permissions Succces';

export const LOAD_PERMISSIONS_LIST = '[Permission] Load Permissions List';
export const LOAD_PERMISSIONS_LIST_SUCCESS = '[Permission] Load Permissions List Succces';

export const SAVE_PERMISSION = '[Permission] Save Permission';
export const SAVE_PERMISSION_SUCCESS = '[Permission] Save Permission Succces';

export const UPDATE_PERMISSION = '[Permission] Update Permission';
export const UPDATE_PERMISSION_SUCCESS = '[Permission] Update Permission Succces';

export const DELETE_PERMISSION = '[Permission] Delete Permission';
export const DELETE_PERMISSION_SUCCESS = '[Permission] Delete Permission Succces';

export const PERMISSION_ERROR = '[Permission] Permission Error';

export const SET_PAGINATION = '[Permission] Set Pagination Data';
export const CHANGE_PAGINATION = '[Permission] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Permission] Change Search Value';

export const RESET_LOAD_REQUEST = '[Permission] Reset Load Request';
export const RESET_LOAD_REQUEST_SUCCESS = '[Permission] Reset Load Request Success';

export class LoadPermissionsAction implements Action {
    readonly type = LOAD_PERMISSIONS;
    constructor() {
    }
}

export class LoadPermissionsSuccessAction implements Action {
    readonly type = LOAD_PERMISSIONS_SUCCESS;
    constructor(public payload: IPermission[]) {}
}

export class LoadPermissionsListAction implements Action {
    readonly type = LOAD_PERMISSIONS_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadPermissionsListSuccessAction implements Action {
    readonly type = LOAD_PERMISSIONS_LIST_SUCCESS;
    constructor(public payload: IPermission[]) {}
}

export class SavePermissionAction implements Action {
    readonly type = SAVE_PERMISSION;
    constructor(public payload: IPermission) {
    }
}

export class SavePermissionSuccessAction implements Action {
    readonly type = SAVE_PERMISSION_SUCCESS;
    constructor() {}
}

export class UpdatePermissionAction implements Action {
    readonly type = UPDATE_PERMISSION;
    constructor(public payload: IPermission ) {
    }
}

export class UpdatePermissionSuccessAction implements Action {
    readonly type = UPDATE_PERMISSION_SUCCESS;
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

export class DeletePermissionAction implements Action {
    readonly type = DELETE_PERMISSION;
    constructor(public payload: IPermission) {
    }
}

export class DeletePermissionSuccessAction implements Action {
    readonly type = DELETE_PERMISSION_SUCCESS;
    constructor() {}
}

export class PermissionErrorAction implements Action {
    readonly type = PERMISSION_ERROR;
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
    = LoadPermissionsAction
    | LoadPermissionsSuccessAction
    | LoadPermissionsListAction
    | LoadPermissionsListSuccessAction
    | SavePermissionAction
    | SavePermissionSuccessAction
    | UpdatePermissionAction
    | UpdatePermissionSuccessAction
    | DeletePermissionAction
    | DeletePermissionSuccessAction
    | PermissionErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction
    | ResetLoadRequestAction
    | ResetLoadRequestSuccessAction;
