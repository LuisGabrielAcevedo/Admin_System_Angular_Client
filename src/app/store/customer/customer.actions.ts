import { ICustomer } from './../../inferfaces/customer';
import { Action } from '@ngrx/store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


export const LOAD_CUSTOMERS = '[Customer] Load Customers';
export const LOAD_CUSTOMERS_SUCCESS = '[Customer] Load Customers Succces';

export const SAVE_CUSTOMER = '[Customer] Save Customer';
export const SAVE_CUSTOMER_SUCCESS = '[Customer] Save Customer Succces';

export const UPDATE_CUSTOMER = '[Customer] Update Customer';
export const UPDATE_CUSTOMER_SUCCESS = '[Customer] Update Customer Succces';

export const DELETE_CUSTOMER = '[Customer] Delete Customer';
export const DELETE_CUSTOMER_SUCCESS = '[Customer] Delete Customer Succces';

export const CUSTOMER_ERROR = '[Customer] Customer Error';

export const SET_PAGINATION = '[Customer] Set Pagination Data';
export const CHANGE_PAGINATION = '[Customer] Change Pagination Data';

export const CHANGE_SEARCH_VALUE = '[Customer] Change Search Value';


export class LoadCustomersAction implements Action {
    readonly type = LOAD_CUSTOMERS;
    constructor() {
    }
}

export class LoadCustomersSuccessAction implements Action {
    readonly type = LOAD_CUSTOMERS_SUCCESS;
    constructor(public payload: ICustomer[]) {}
}

export class SaveCustomerAction implements Action {
    readonly type = SAVE_CUSTOMER;
    constructor(public payload: ICustomer) {
    }
}

export class SaveCustomerSuccessAction implements Action {
    readonly type = SAVE_CUSTOMER_SUCCESS;
    constructor() {}
}

export class UpdateCustomerAction implements Action {
    readonly type = UPDATE_CUSTOMER;
    constructor(public payload: {customer: ICustomer, file: File} ) {
    }
}


export class UpdateCustomerSuccessAction implements Action {
    readonly type = UPDATE_CUSTOMER_SUCCESS;
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

export class DeleteCustomerAction implements Action {
    readonly type = DELETE_CUSTOMER;
    constructor(public payload: ICustomer) {
    }
}

export class DeleteCustomerSuccessAction implements Action {
    readonly type = DELETE_CUSTOMER_SUCCESS;
    constructor() {}
}

export class CustomerErrorAction implements Action {
    readonly type = CUSTOMER_ERROR;
    constructor(public payload: any) { }
}

export class ChangeSearchValueAction implements Action {
    readonly type = CHANGE_SEARCH_VALUE;
    constructor(public payload: string) { }
}


export type Actions
    = LoadCustomersAction
    | LoadCustomersSuccessAction
    | SaveCustomerAction
    | SaveCustomerSuccessAction
    | UpdateCustomerAction
    | UpdateCustomerSuccessAction
    | DeleteCustomerAction
    | DeleteCustomerSuccessAction
    | CustomerErrorAction
    | SetPaginationAction
    | ChangePaginationAction
    | ChangeSearchValueAction;

