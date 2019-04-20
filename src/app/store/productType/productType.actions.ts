import { Action } from '@ngrx/store';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';
import { IProductType } from '../../inferfaces/productType';

export const LOAD_PRODUCT_TYPES = '[Product Type] Load Product Types';
export const LOAD_PRODUCT_TYPES_SUCCESS = '[Product Type] Load Product Types Succces';

export const LOAD_PRODUCT_TYPES_LIST = '[Product Type] Load Product Types List';
export const LOAD_PRODUCT_TYPES_LIST_SUCCESS = '[Product Type] Load Product Types List Succces';

export const SAVE_PRODUCT_TYPE = '[Product Type] Save Product Type';
export const SAVE_PRODUCT_TYPE_SUCCESS = '[Product Type] Save Product Type Succces';

export const UPDATE_PRODUCT_TYPE = '[Product Type] Update Product Type';
export const UPDATE_PRODUCT_TYPE_SUCCESS = '[Product Type] Update Product Type Succces';

export const DELETE_PRODUCT_TYPE = '[Product Type] Delete Product Type';
export const DELETE_PRODUCT_TYPE_SUCCESS = '[Product Type] Delete Product Type Succces';

export const PRODUCT_TYPE_ERROR = '[Product Type] Product Type Error';

export const SET_PAGINATION = '[Product Type] Set Pagination Data';
export const CHANGE_PAGINATION = '[Product Type] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Product Type] Change Search Value';


export class LoadProductTypesAction implements Action {
    readonly type = LOAD_PRODUCT_TYPES;
    constructor() {
    }
}

export class LoadProductTypesSuccessAction implements Action {
    readonly type = LOAD_PRODUCT_TYPES_SUCCESS;
    constructor(public payload: IProductType[]) {}
}

export class LoadProductTypesListAction implements Action {
    readonly type = LOAD_PRODUCT_TYPES_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadProductTypesListSuccessAction implements Action {
    readonly type = LOAD_PRODUCT_TYPES_LIST_SUCCESS;
    constructor(public payload: IProductType[]) {}
}


export class SaveProductTypeAction implements Action {
    readonly type = SAVE_PRODUCT_TYPE;
    constructor(public payload: IProductType) {
    }
}

export class SaveProductTypeSuccessAction implements Action {
    readonly type = SAVE_PRODUCT_TYPE_SUCCESS;
    constructor() {}
}

export class UpdateProductTypeAction implements Action {
    readonly type = UPDATE_PRODUCT_TYPE;
    constructor(public payload: IProductType) {
    }
}

export class UpdateProductTypeSuccessAction implements Action {
    readonly type = UPDATE_PRODUCT_TYPE_SUCCESS;
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

export class DeleteProductTypeAction implements Action {
    readonly type = DELETE_PRODUCT_TYPE;
    constructor(public payload: IProductType) {
    }
}

export class DeleteProductTypeSuccessAction implements Action {
    readonly type = DELETE_PRODUCT_TYPE_SUCCESS;
    constructor() {}
}

export class ProductTypeErrorAction implements Action {
    readonly type = PRODUCT_TYPE_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadProductTypesAction
    | LoadProductTypesSuccessAction
    | LoadProductTypesListAction
    | LoadProductTypesListSuccessAction
    | SaveProductTypeAction
    | SaveProductTypeSuccessAction
    | UpdateProductTypeAction
    | UpdateProductTypeSuccessAction
    | DeleteProductTypeAction
    | DeleteProductTypeSuccessAction
    | ProductTypeErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

