import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as CompanyActions from './company.actions';
import { CompanyService } from '../../services/http/company.service';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class CompanyEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpCompanyService: CompanyService
    ) { }

    @Effect()
    loadCompanies$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.LoadCompaniesAction>(CompanyActions.LOAD_COMPANIES),
        switchMap((action) =>
            this.httpCompanyService.getCompanies().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new CompanyActions.SetPaginationAction(pagination),
                        new CompanyActions.LoadCompaniesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new CompanyActions.CompanyErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadCompaniesList$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.LoadCompaniesListAction>(CompanyActions.LOAD_COMPANIES_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpCompanyService.getCompaniesList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new CompanyActions.LoadCompaniesListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new CompanyActions.CompanyErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveCompany$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.SaveCompanyAction>(CompanyActions.SAVE_COMPANY),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpCompanyService.saveCompany(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/companies/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CompanyActions.SaveCompanySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CompanyActions.CompanyErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateCompany$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.UpdateCompanyAction>(CompanyActions.UPDATE_COMPANY),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpCompanyService.updateCompany(updateRequest.company, updateRequest.file).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/companies/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CompanyActions.UpdateCompanySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CompanyActions.CompanyErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteCompany$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.DeleteCompanyAction>(CompanyActions.DELETE_COMPANY),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpCompanyService.deleteCompany(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new CompanyActions.DeleteCompanySuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CompanyActions.LoadCompaniesAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new CompanyActions.CompanyErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.ChangePaginationAction>(CompanyActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpCompanyService.changePagination(pagination).pipe(
                map((response) => {
                    return new CompanyActions.LoadCompaniesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.ChangeSearchValueAction>(CompanyActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpCompanyService.changeSearchValue(value).pipe(
                map((response) => {
                    return new CompanyActions.LoadCompaniesAction();
                })
            )
        )
    );

    @Effect()
    localError$: Observable<Action> = this.actions$.pipe(
        ofType<CompanyActions.CompanyErrorAction>(CompanyActions.COMPANY_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
