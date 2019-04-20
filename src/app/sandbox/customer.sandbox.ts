import { ICompany } from 'src/app/inferfaces/company';
import { ICustomer } from './../inferfaces/customer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CustomerActions from '../store/customer/customer.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


@Injectable()
export class CustomerSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchCustomers(): Observable<ICustomer[]> {
        return this.store.select(fromRoot.getCustomers);
    }
    fetchIsLoadingCustomers(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCustomers);
    }
    loadCustomers(): void {
        this.store.dispatch(new CustomerActions.LoadCustomersAction());
    }
    fetchIsLoadingCustomer(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCustomer);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationCustomer);
    }
    saveCustomer(customer: ICustomer): void {
        this.store.dispatch(new CustomerActions.SaveCustomerAction(customer));
    }
    updateCustomer(customer: ICustomer, file: File): void {
        this.store.dispatch(new CustomerActions.UpdateCustomerAction({ customer: customer, file: file }));

    }

   deleteCustomer(customer: ICustomer): void {
        this.store.dispatch(new CustomerActions.DeleteCustomerAction(customer));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new CustomerActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new CustomerActions.ChangeSearchValueAction(value));
    }

}
