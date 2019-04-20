import { Action } from '@ngrx/store';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from '../../inferfaces/loadRequest';
import { IProductCategory } from '../../inferfaces/productCategory';

export const LOAD_PRODUCT_CATEGORIES = '[Product Category] Load Product Categories';
export const LOAD_PRODUCT_CATEGORIES_SUCCESS = '[Product Category] Load Product Categories Succces';

export const LOAD_PRODUCT_CATEGORIES_LIST = '[Product Category] Load Product Categories List';
export const LOAD_PRODUCT_CATEGORIES_LIST_SUCCESS = '[Product Category] Load Product Categories List Succces';

export const SAVE_PRODUCT_CATEGORY = '[Product Category] Save Product Category';
export const SAVE_PRODUCT_CATEGORY_SUCCESS = '[Product Category] Save Product Category Succces';

export const UPDATE_PRODUCT_CATEGORY = '[Product Category] Update Product Category';
export const UPDATE_PRODUCT_CATEGORY_SUCCESS = '[Product Category] Update Product Category Succces';

export const DELETE_PRODUCT_CATEGORY = '[Product Category] Delete Product Category';
export const DELETE_PRODUCT_CATEGORY_SUCCESS = '[Product Category] Delete Product Category Succces';

export const PRODUCT_CATEGORY_ERROR = '[Product Category] Product Category Error';

export const SET_PAGINATION = '[Product Category] Set Pagination Data';
export const CHANGE_PAGINATION = '[Product Category] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Product Category] Change Search Value';


export class LoadProductCategoriesAction implements Action {
    readonly type = LOAD_PRODUCT_CATEGORIES;
    constructor() {
    }
}

export class LoadProductCategoriesSuccessAction implements Action {
    readonly type = LOAD_PRODUCT_CATEGORIES_SUCCESS;
    constructor(public payload: IProductCategory[]) {}
}

export class LoadProductCategoriesListAction implements Action {
    readonly type = LOAD_PRODUCT_CATEGORIES_LIST;
    constructor(public payload: ILoadRequest) {
    }
}

export class LoadProductCategoriesListSuccessAction implements Action {
    readonly type = LOAD_PRODUCT_CATEGORIES_LIST_SUCCESS;
    constructor(public payload: IProductCategory[]) {}
}


export class SaveProductCategoryAction implements Action {
    readonly type = SAVE_PRODUCT_CATEGORY;
    constructor(public payload: IProductCategory) {
    }
}

export class SaveProductCategorySuccessAction implements Action {
    readonly type = SAVE_PRODUCT_CATEGORY_SUCCESS;
    constructor() {}
}

export class UpdateProductCategoryAction implements Action {
    readonly type = UPDATE_PRODUCT_CATEGORY;
    constructor(public payload: IProductCategory) {
    }
}

export class UpdateProductCategorySuccessAction implements Action {
    readonly type = UPDATE_PRODUCT_CATEGORY_SUCCESS;
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

export class DeleteProductCategoryAction implements Action {
    readonly type = DELETE_PRODUCT_CATEGORY;
    constructor(public payload: IProductCategory) {
    }
}

export class DeleteProductCategorySuccessAction implements Action {
    readonly type = DELETE_PRODUCT_CATEGORY_SUCCESS;
    constructor() {}
}

export class ProductCategoryErrorAction implements Action {
    readonly type = PRODUCT_CATEGORY_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}

export type Actions
    = LoadProductCategoriesAction
    | LoadProductCategoriesSuccessAction
    | LoadProductCategoriesListAction
    | LoadProductCategoriesListSuccessAction
    | SaveProductCategoryAction
    | SaveProductCategorySuccessAction
    | UpdateProductCategoryAction
    | UpdateProductCategorySuccessAction
    | DeleteProductCategoryAction
    | DeleteProductCategorySuccessAction
    | ProductCategoryErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

