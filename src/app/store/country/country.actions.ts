import { Action } from '@ngrx/store';
import { ICountry } from '../../inferfaces/country';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';

export const LOAD_COUNTRIES = '[country] Load countries';
export const LOAD_COUNTRIES_SUCCESS = '[country] Load countries Succces';

export const LOAD_COUNTRIES_LIST = '[country] Load countries List';
export const LOAD_COUNTRIES_LIST_SUCCESS = '[country] Load countries List Succces';

export const SAVE_COUNTRY = '[country] Save country';
export const SAVE_COUNTRY_SUCCESS = '[country] Save country Succces';

export const UPDATE_COUNTRY = '[country] Update country';
export const UPDATE_COUNTRY_SUCCESS = '[country] Update country Succces';

export const DELETE_COUNTRY = '[country] Delete country';
export const DELETE_COUNTRY_SUCCESS = '[country] Delete country Succces';

export const COUNTRY_ERROR = '[country] country Error';

export const SET_PAGINATION = '[country] Set Pagination Data';
export const CHANGE_PAGINATION = '[country] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[country] Change Search Value';


export class LoadCountriesAction implements Action {
    readonly type = LOAD_COUNTRIES;
    constructor() {
    }
}

export class LoadCountriesSuccessAction implements Action {
    readonly type = LOAD_COUNTRIES_SUCCESS;
    constructor(public payload: ICountry[]) {}
}

export class LoadCountriesListAction implements Action {
    readonly type = LOAD_COUNTRIES_LIST;
    constructor ( public payload: ILoadRequest) {
    }
}

export class LoadCountriesListSuccessAction implements Action {
    readonly type = LOAD_COUNTRIES_LIST_SUCCESS;
    constructor(public payload: ICountry[]) {}
}


export class SaveCountryAction implements Action {
    readonly type = SAVE_COUNTRY;
    constructor(public payload: ICountry) {
    }
}

export class SaveCountrySuccessAction implements Action {
    readonly type = SAVE_COUNTRY_SUCCESS;
    constructor() {}
}

export class UpdateCountryAction implements Action {
    readonly type = UPDATE_COUNTRY;
    constructor(public payload: ICountry ) {
    }
}

export class UpdateCountrySuccessAction implements Action {
    readonly type = UPDATE_COUNTRY_SUCCESS;
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

export class DeleteCountryAction implements Action {
    readonly type = DELETE_COUNTRY;
    constructor(public payload: ICountry) {
    }
}

export class DeleteCountrySuccessAction implements Action {
    readonly type = DELETE_COUNTRY_SUCCESS;
    constructor() {}
}

export class CountryErrorAction implements Action {
    readonly type = COUNTRY_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadCountriesAction
    | LoadCountriesSuccessAction
    | LoadCountriesListAction
    | LoadCountriesListSuccessAction
    | SaveCountryAction
    | SaveCountrySuccessAction
    | UpdateCountryAction
    | UpdateCountrySuccessAction
    | DeleteCountryAction
    | DeleteCountrySuccessAction
    | CountryErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;
