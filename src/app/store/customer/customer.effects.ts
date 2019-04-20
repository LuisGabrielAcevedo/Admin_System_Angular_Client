import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as CustomerActions from './customer.actions';
import { CustomerService } from '../../services/http/customer.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class CustomerEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpCustomerService: CustomerService
    ) { }

    @Effect()
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.LoadCustomersAction>(CustomerActions.LOAD_CUSTOMERS),
        switchMap((action) =>
            this.httpCustomerService.getCustomers().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new CustomerActions.SetPaginationAction(pagination),
                        new CustomerActions.LoadCustomersSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new CustomerActions.CustomerErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.SaveCustomerAction>(CustomerActions.SAVE_CUSTOMER),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpCustomerService.saveCustomer(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/customers/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CustomerActions.SaveCustomerSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CustomerActions.CustomerErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.UpdateCustomerAction>(CustomerActions.UPDATE_CUSTOMER),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpCustomerService.updateCustomer(updateRequest.customer, updateRequest.file).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/customers/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CustomerActions.UpdateCustomerSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CustomerActions.CustomerErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.DeleteCustomerAction>(CustomerActions.DELETE_CUSTOMER),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpCustomerService.deleteCustomer(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new CustomerActions.DeleteCustomerSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CustomerActions.LoadCustomersAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CustomerActions.CustomerErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.ChangePaginationAction>(CustomerActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpCustomerService.changePagination(pagination).pipe(
                map((response) => {
                    return new CustomerActions.LoadCustomersAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.ChangeSearchValueAction>(CustomerActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpCustomerService.changeSearchValue(value).pipe(
                map((response) => {
                    return new CustomerActions.LoadCustomersAction();
                })
            )
        )
    );

    @Effect()
    CustomerError$: Observable<Action> = this.actions$.pipe(
        ofType<CustomerActions.CustomerErrorAction>(CustomerActions.CUSTOMER_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
