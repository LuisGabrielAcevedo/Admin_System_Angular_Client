import { ICustomer } from './../../inferfaces/customer';
import * as CustomersActions from './customer.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ICompany } from 'src/app/inferfaces/company';

export interface CustomerState {
    customers: ICustomer[];
    isLoadingCustomers: boolean;
    isLoadingCustomer: boolean;
    pagination: TablePagination;
}


export const initialState: CustomerState = {
    customers: [],
    isLoadingCustomers: false,
    isLoadingCustomer: false,
    pagination: null,
};

export const getCustomers = (state: CustomerState) => state.customers;
export const getIsLoadingCustomers = (state: CustomerState) => state.isLoadingCustomers;
export const getIsLoadingCustomer = (state: CustomerState) => state.isLoadingCustomer;
export const getPagination = (state: CustomerState) => state.pagination;

export function CustomerReducer(state = initialState, action: CustomersActions.Actions): CustomerState {
    switch (action.type) {
        case CustomersActions.LOAD_CUSTOMERS: {
            return Object.assign({}, state, {
                isLoadingCustomers: true
            });
        }
        case CustomersActions.LOAD_CUSTOMERS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCustomers: false,
                customers: action.payload
            });
        }
        case CustomersActions.SAVE_CUSTOMER: {
            return Object.assign({}, state, {
                isLoadingCustomers: true
            });
        }
        case CustomersActions.SAVE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCustomers: false
            });
        }
        case CustomersActions.UPDATE_CUSTOMER: {
            return Object.assign({}, state, {
                isLoadingCustomers: true
            });
        }
        case CustomersActions.UPDATE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCustomers: false
            });
        }
        case CustomersActions.DELETE_CUSTOMER: {
            return Object.assign({}, state, {
                isLoadingCustomers: true
            });
        }
        case CustomersActions.DELETE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCustomers: false
            });
        }
        case CustomersActions.CUSTOMER_ERROR: {
            return Object.assign({}, state, {
                isLoadingCustomers: false
            });
        }
        case CustomersActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
