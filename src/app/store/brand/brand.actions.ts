import { Action } from '@ngrx/store';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';
import { IBrand } from '../../inferfaces/brand';

export const LOAD_BRANDS = '[Brand] Load Brands';
export const LOAD_BRANDS_SUCCESS = '[Brand] Load Brands Succces';

export const LOAD_BRANDS_LIST = '[Brand] Load Brands List';
export const LOAD_BRANDS_LIST_SUCCESS = '[Brand] Load Brands List Succces';

export const SAVE_BRAND = '[Brand] Save Brand';
export const SAVE_BRAND_SUCCESS = '[Brand] Save Brand Succces';

export const UPDATE_BRAND = '[Brand] Update Brand';
export const UPDATE_BRAND_SUCCESS = '[Brand] Update Brand Succces';

export const DELETE_BRAND = '[Brand] Delete Brand';
export const DELETE_BRAND_SUCCESS = '[Brand] Delete Brand Succces';

export const BRAND_ERROR = '[Brand] Brand Error';

export const SET_PAGINATION = '[Brand] Set Pagination Data';
export const CHANGE_PAGINATION = '[Brand] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Brand] Change Search Value';


export class LoadBrandsAction implements Action {
    readonly type = LOAD_BRANDS;
    constructor() {
    }
}

export class LoadBrandsSuccessAction implements Action {
    readonly type = LOAD_BRANDS_SUCCESS;
    constructor(public payload: IBrand[]) {}
}

export class LoadBrandsListAction implements Action {
    readonly type = LOAD_BRANDS_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadBrandsListSuccessAction implements Action {
    readonly type = LOAD_BRANDS_LIST_SUCCESS;
    constructor(public payload: IBrand[]) {}
}


export class SaveBrandAction implements Action {
    readonly type = SAVE_BRAND;
    constructor(public payload: IBrand) {
    }
}

export class SaveBrandSuccessAction implements Action {
    readonly type = SAVE_BRAND_SUCCESS;
    constructor() {}
}

export class UpdateBrandAction implements Action {
    readonly type = UPDATE_BRAND;
    constructor(public payload: IBrand) {
    }
}

export class UpdateBrandSuccessAction implements Action {
    readonly type = UPDATE_BRAND_SUCCESS;
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

export class DeleteBrandAction implements Action {
    readonly type = DELETE_BRAND;
    constructor(public payload: IBrand) {
    }
}

export class DeleteBrandSuccessAction implements Action {
    readonly type = DELETE_BRAND_SUCCESS;
    constructor() {}
}

export class BrandErrorAction implements Action {
    readonly type = BRAND_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadBrandsAction
    | LoadBrandsSuccessAction
    | LoadBrandsListAction
    | LoadBrandsListSuccessAction
    | SaveBrandAction
    | SaveBrandSuccessAction
    | UpdateBrandAction
    | UpdateBrandSuccessAction
    | DeleteBrandAction
    | DeleteBrandSuccessAction
    | BrandErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

