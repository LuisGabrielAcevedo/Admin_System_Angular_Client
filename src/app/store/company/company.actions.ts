import { ICompany } from './../../inferfaces/company';
import { Action } from '@ngrx/store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';

export const LOAD_COMPANIES = '[Company] Load companies';
export const LOAD_COMPANIES_SUCCESS = '[Company] Load companies Succces';

export const LOAD_COMPANIES_LIST = '[Company] Load companies List';
export const LOAD_COMPANIES_LIST_SUCCESS = '[Company] Load companies List Succces';

export const SAVE_COMPANY = '[Company] Save Company';
export const SAVE_COMPANY_SUCCESS = '[Company] Save Company Succces';

export const UPDATE_COMPANY = '[Company] Update Company';
export const UPDATE_COMPANY_SUCCESS = '[Company] Update Company Succces';

export const DELETE_COMPANY = '[Company] Delete Company';
export const DELETE_COMPANY_SUCCESS = '[Company] Delete Company Succces';

export const COMPANY_ERROR = '[Company] Company Error';

export const SET_PAGINATION = '[Company] Set Pagination Data';
export const CHANGE_PAGINATION = '[Company] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Company] Change Search Value';


export class LoadCompaniesAction implements Action {
    readonly type = LOAD_COMPANIES;
    constructor() {
    }
}

export class LoadCompaniesSuccessAction implements Action {
    readonly type = LOAD_COMPANIES_SUCCESS;
    constructor(public payload: ICompany[]) {}
}

export class LoadCompaniesListAction implements Action {
    readonly type = LOAD_COMPANIES_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadCompaniesListSuccessAction implements Action {
    readonly type = LOAD_COMPANIES_LIST_SUCCESS;
    constructor(public payload: ICompany[]) {}
}


export class SaveCompanyAction implements Action {
    readonly type = SAVE_COMPANY;
    constructor(public payload: ICompany) {
    }
}

export class SaveCompanySuccessAction implements Action {
    readonly type = SAVE_COMPANY_SUCCESS;
    constructor() {}
}

export class UpdateCompanyAction implements Action {
    readonly type = UPDATE_COMPANY;
    constructor(public payload: {company: ICompany, file: File} ) {
    }
}

export class UpdateCompanySuccessAction implements Action {
    readonly type = UPDATE_COMPANY_SUCCESS;
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

export class DeleteCompanyAction implements Action {
    readonly type = DELETE_COMPANY;
    constructor(public payload: ICompany) {
    }
}

export class DeleteCompanySuccessAction implements Action {
    readonly type = DELETE_COMPANY_SUCCESS;
    constructor() {}
}

export class CompanyErrorAction implements Action {
    readonly type = COMPANY_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadCompaniesAction
    | LoadCompaniesSuccessAction
    | LoadCompaniesListAction
    | LoadCompaniesListSuccessAction
    | SaveCompanyAction
    | SaveCompanySuccessAction
    | UpdateCompanyAction
    | UpdateCompanySuccessAction
    | DeleteCompanyAction
    | DeleteCompanySuccessAction
    | CompanyErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

