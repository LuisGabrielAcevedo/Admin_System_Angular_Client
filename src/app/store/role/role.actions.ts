import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { Action } from '@ngrx/store';
import { IRole } from '../../inferfaces/role';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


export const LOAD_ROLES = '[Role] Load Roles';
export const LOAD_ROLES_SUCCESS = '[Role] Load Roles Succces';

export const LOAD_ROLES_LIST = '[Role] Load Roles List';
export const LOAD_ROLES_LIST_SUCCESS = '[Role] Load Roles List Succces';

export const SAVE_ROLE = '[Role] Save Role';
export const SAVE_ROLE_SUCCESS = '[Role] Save Role Succces';

export const UPDATE_ROLE = '[Role] Update Role';
export const UPDATE_ROLE_SUCCESS = '[Role] Update Role Succces';

export const DELETE_ROLE = '[Role] Delete Role';
export const DELETE_ROLE_SUCCESS = '[Role] Delete Role Succces';

export const ROLE_ERROR = '[Role] Role Error';

export const SET_PAGINATION = '[Role] Set Pagination Data';
export const CHANGE_PAGINATION = '[Role] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Role] Change Search Value';

export const LOAD_APPLICATIONS_LIST = '[Role] Load Applications List';
export const LOAD_APPLICATIONS_LIST_SUCCESS = '[Role] Load Applications List Success';

export const RESET_LOAD_REQUEST = '[Role] Reset Load Request';
export const RESET_LOAD_REQUEST_SUCCESS = '[Role] Reset Load Request Success';


export class LoadRolesAction implements Action {
    readonly type = LOAD_ROLES;
    constructor() {
    }
}

export class LoadRolesSuccessAction implements Action {
    readonly type = LOAD_ROLES_SUCCESS;
    constructor(public payload: IRole[]) {}
}

export class LoadRolesListAction implements Action {
    readonly type = LOAD_ROLES_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadRolesListSuccessAction implements Action {
    readonly type = LOAD_ROLES_LIST_SUCCESS;
    constructor(public payload: IRole[]) {}
}

export class SaveRoleAction implements Action {
    readonly type = SAVE_ROLE;
    constructor(public payload: IRole) {
    }
}

export class SaveRoleSuccessAction implements Action {
    readonly type = SAVE_ROLE_SUCCESS;
    constructor() {}
}

export class UpdateRoleAction implements Action {
    readonly type = UPDATE_ROLE;
    constructor(public payload: IRole ) {
    }
}

export class UpdateRoleSuccessAction implements Action {
    readonly type = UPDATE_ROLE_SUCCESS;
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

export class DeleteRoleAction implements Action {
    readonly type = DELETE_ROLE;
    constructor(public payload: IRole) {
    }
}

export class DeleteRoleSuccessAction implements Action {
    readonly type = DELETE_ROLE_SUCCESS;
    constructor() {}
}

export class RoleErrorAction implements Action {
    readonly type = ROLE_ERROR;
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
    = LoadRolesAction
    | LoadRolesSuccessAction
    | LoadRolesListAction
    | LoadRolesListSuccessAction
    | SaveRoleAction
    | SaveRoleSuccessAction
    | UpdateRoleAction
    | UpdateRoleSuccessAction
    | DeleteRoleAction
    | DeleteRoleSuccessAction
    | RoleErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction
    | ResetLoadRequestAction
    | ResetLoadRequestSuccessAction;
