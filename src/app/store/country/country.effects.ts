import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as CountryActions from './country.actions';
import { CountryService } from '../../services/http/country.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class CountryEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpCountryService: CountryService
    ) { }

    @Effect()
    loadCountries$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.LoadCountriesAction>(CountryActions.LOAD_COUNTRIES),
        switchMap((action) =>
            this.httpCountryService.getCountries().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new CountryActions.SetPaginationAction(pagination),
                        new CountryActions.LoadCountriesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new CountryActions.CountryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadCountriesList$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.LoadCountriesListAction>(CountryActions.LOAD_COUNTRIES_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpCountryService.getCountriesList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new CountryActions.LoadCountriesListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new CountryActions.CountryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveCountry$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.SaveCountryAction>(CountryActions.SAVE_COUNTRY),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpCountryService.saveCountry(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/countries/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CountryActions.SaveCountrySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new CountryActions.CountryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateCountry$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.UpdateCountryAction>(CountryActions.UPDATE_COUNTRY),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpCountryService.updateCountry(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/countries/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CountryActions.UpdateCountrySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new CountryActions.CountryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteCountry$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.DeleteCountryAction>(CountryActions.DELETE_COUNTRY),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpCountryService.deleteCountry(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new CountryActions.DeleteCountrySuccessAction(),
                        new CountryActions.LoadCountriesAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new CountryActions.CountryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.ChangePaginationAction>(CountryActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpCountryService.changePagination(pagination).pipe(
                map((response) => {
                    return new CountryActions.LoadCountriesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<CountryActions.ChangeSearchValueAction>(CountryActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpCountryService.changeSearchValue(value).pipe(
                map((response) => {
                    return new CountryActions.LoadCountriesAction();
                })
            )
        )
    );
}
