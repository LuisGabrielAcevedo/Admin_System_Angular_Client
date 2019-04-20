import { Action } from '@ngrx/store';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';
import { IProduct } from 'src/app/inferfaces/product';

export const LOAD_PRODUCTS = '[Product] Load Products ';
export const LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Succces';

export const LOAD_PRODUCTS_LIST = '[Product] Load Products List';
export const LOAD_PRODUCTS_LIST_SUCCESS = '[Product] Load Products List Succces';

export const SAVE_PRODUCT = '[Product] Save Product ';
export const SAVE_PRODUCT_SUCCESS = '[Product] Save Product Succces';

export const UPDATE_PRODUCT = '[Product] Update Product ';
export const UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Succces';

export const DELETE_PRODUCT = '[Product] Delete Product ';
export const DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Succces';

export const PRODUCT_ERROR = '[Product] Product  Error';

export const SET_PAGINATION = '[Product] Set Pagination Data';
export const CHANGE_PAGINATION = '[Product] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Product] Change Search Value';


export class LoadProductsAction implements Action {
    readonly type = LOAD_PRODUCTS;
    constructor() {
    }
}

export class LoadProductsSuccessAction implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: IProduct[]) {}
}

export class LoadProductsListAction implements Action {
    readonly type = LOAD_PRODUCTS_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadProductsListSuccessAction implements Action {
    readonly type = LOAD_PRODUCTS_LIST_SUCCESS;
    constructor(public payload: IProduct[]) {}
}


export class SaveProductAction implements Action {
    readonly type = SAVE_PRODUCT;
    constructor(public payload: IProduct) {
    }
}

export class SaveProductSuccessAction implements Action {
    readonly type = SAVE_PRODUCT_SUCCESS;
    constructor() {}
}

export class UpdateProductAction implements Action {
    readonly type = UPDATE_PRODUCT;
    constructor(public payload: IProduct) {
    }
}

export class UpdateProductSuccessAction implements Action {
    readonly type = UPDATE_PRODUCT_SUCCESS;
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

export class DeleteProductAction implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: IProduct) {
    }
}

export class DeleteProductSuccessAction implements Action {
    readonly type = DELETE_PRODUCT_SUCCESS;
    constructor() {}
}

export class ProductErrorAction implements Action {
    readonly type = PRODUCT_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadProductsAction
    | LoadProductsSuccessAction
    | LoadProductsListAction
    | LoadProductsListSuccessAction
    | SaveProductAction
    | SaveProductSuccessAction
    | UpdateProductAction
    | UpdateProductSuccessAction
    | DeleteProductAction
    | DeleteProductSuccessAction
    | ProductErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

