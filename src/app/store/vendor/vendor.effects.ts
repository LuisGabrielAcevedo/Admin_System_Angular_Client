import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as VendorActions from './vendor.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { VendorService } from 'src/app/services/http/vendor.service';


@Injectable()
export class VendorEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpVendorService: VendorService
    ) { }

    @Effect()
    loadVendors$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.LoadVendorsAction>(VendorActions.LOAD_VENDORS),
        switchMap((action) =>
            this.httpVendorService.getVendors().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };

                    return [
                        new VendorActions.SetPaginationAction(pagination),
                        new VendorActions.LoadVendorsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new VendorActions.VendorErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadVendorsList$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.LoadVendorsListAction>(VendorActions.LOAD_VENDORS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpVendorService.getVendorsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new VendorActions.LoadVendorsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new VendorActions.VendorErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveVendor$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.SaveVendorAction>(VendorActions.SAVE_VENDOR),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpVendorService.saveVendor(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/vendors/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new VendorActions.SaveVendorSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new VendorActions.VendorErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateVendor$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.UpdateVendorAction>(VendorActions.UPDATE_VENDOR),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpVendorService.updateVendor(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/vendors/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new VendorActions.UpdateVendorSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new VendorActions.VendorErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteVendor$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.DeleteVendorAction>(VendorActions.DELETE_VENDOR),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpVendorService.deleteVendor(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new VendorActions.DeleteVendorSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new VendorActions.LoadVendorsAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new VendorActions.VendorErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.ChangePaginationAction>(VendorActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpVendorService.changePagination(pagination).pipe(
                map((response) => {
                    return new VendorActions.LoadVendorsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.ChangeSearchValueAction>(VendorActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpVendorService.changeSearchValue(value).pipe(
                map((response) => {
                    return new VendorActions.LoadVendorsAction();
                })
            )
        )
    );

    @Effect()
    VendorError$: Observable<Action> = this.actions$.pipe(
        ofType<VendorActions.VendorErrorAction>(VendorActions.VENDOR_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
