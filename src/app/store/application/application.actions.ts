import { IApplication } from './../../inferfaces/application';
import { Action } from '@ngrx/store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';

export const LOAD_APPLICATIONS = '[application] Load applications';
export const LOAD_APPLICATIONS_SUCCESS = '[application] Load applications Succces';

export const LOAD_APPLICATIONS_LIST = '[application] Load applications List';
export const LOAD_APPLICATIONS_LIST_SUCCESS = '[application] Load applications List Succces';

export const SAVE_APPLICATION = '[application] Save application';
export const SAVE_APPLICATION_SUCCESS = '[application] Save application Succces';

export const UPDATE_APPLICATION = '[application] Update application';
export const UPDATE_APPLICATION_SUCCESS = '[application] Update application Succces';

export const DELETE_APPLICATION = '[application] Delete application';
export const DELETE_APPLICATION_SUCCESS = '[application] Delete application Succces';

export const APPLICATION_ERROR = '[application] application Error';

export const SET_PAGINATION = '[application] Set Pagination Data';
export const CHANGE_PAGINATION = '[application] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[application] Change Search Value';


export class LoadApplicationsAction implements Action {
    readonly type = LOAD_APPLICATIONS;
    constructor() {
    }
}

export class LoadApplicationsSuccessAction implements Action {
    readonly type = LOAD_APPLICATIONS_SUCCESS;
    constructor(public payload: IApplication[]) {

    }
}

export class LoadApplicationsListAction implements Action {
    readonly type = LOAD_APPLICATIONS_LIST;
    constructor( public payload: ILoadRequest) {
    }
}

export class LoadApplicationsListSuccessAction implements Action {
    readonly type = LOAD_APPLICATIONS_LIST_SUCCESS;
    constructor(public payload: IApplication[]) {

    }
}

export class SaveApplicationAction implements Action {
    readonly type = SAVE_APPLICATION;
    constructor(public payload: IApplication) {
    }
}

export class SaveApplicationSuccessAction implements Action {
    readonly type = SAVE_APPLICATION_SUCCESS;
    constructor() {}
}

export class UpdateApplicationAction implements Action {
    readonly type = UPDATE_APPLICATION;
    constructor(public payload: IApplication ) {
    }
}

export class UpdateApplicationSuccessAction implements Action {
    readonly type = UPDATE_APPLICATION_SUCCESS;
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

export class DeleteApplicationAction implements Action {
    readonly type = DELETE_APPLICATION;
    constructor(public payload: IApplication) {
    }
}

export class DeleteApplicationSuccessAction implements Action {
    readonly type = DELETE_APPLICATION_SUCCESS;
    constructor() {}
}

export class ApplicationErrorAction implements Action {
    readonly type = APPLICATION_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}


export type Actions
    = LoadApplicationsAction
    | LoadApplicationsSuccessAction
    | LoadApplicationsListAction
    | LoadApplicationsListSuccessAction
    | SaveApplicationAction
    | SaveApplicationSuccessAction
    | UpdateApplicationAction
    | UpdateApplicationSuccessAction
    | DeleteApplicationAction
    | DeleteApplicationSuccessAction
    | ApplicationErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;
