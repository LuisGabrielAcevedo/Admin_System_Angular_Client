import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as LicenseActions from './license.actions';
import { LicenseService } from '../../services/http/license.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class LicenseEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpLicenseService: LicenseService
    ) { }

    @Effect()
    loadLicenses$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.LoadLicensesAction>(LicenseActions.LOAD_LICENSES),
        switchMap((action) =>
            this.httpLicenseService.getLicenses().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new LicenseActions.SetPaginationAction(pagination),
                        new LicenseActions.LoadLicensesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new LicenseActions.LicenseErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveLicense$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.SaveLicenseAction>(LicenseActions.SAVE_LICENSE),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpLicenseService.saveLicense(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/licenses/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LicenseActions.SaveLicenseSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new LicenseActions.LicenseErrorAction(errorResp));
                })
            )
        )
    );


    @Effect()
    updateLicense$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.UpdateLicenseAction>(LicenseActions.UPDATE_LICENSE),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpLicenseService.updateLicense(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/licenses/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LicenseActions.UpdateLicenseSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new LicenseActions.LicenseErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteLicense$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.DeleteLicenseAction>(LicenseActions.DELETE_LICENSE),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpLicenseService.deleteLicense(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LicenseActions.DeleteLicenseSuccessAction(),
                        new LicenseActions.LoadLicensesAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new LicenseActions.LicenseErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.ChangePaginationAction>(LicenseActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpLicenseService.changePagination(pagination).pipe(
                map((response) => {
                    return new LicenseActions.LoadLicensesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<LicenseActions.ChangeSearchValueAction>(LicenseActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpLicenseService.changeSearchValue(value).pipe(
                map((response) => {
                    return new LicenseActions.LoadLicensesAction();
                })
            )
        )
    );
}
