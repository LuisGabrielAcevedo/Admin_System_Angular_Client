import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as BrandsActions from './brand.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { BrandService } from '../../services/http/brand.service';

@Injectable()
export class BrandEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpBrandService: BrandService
    ) { }

    @Effect()
    loadBrands$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.LoadBrandsAction>(BrandsActions.LOAD_BRANDS),
        switchMap((action) =>
            this.httpBrandService.getBrands().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new BrandsActions.SetPaginationAction(pagination),
                        new BrandsActions.LoadBrandsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new BrandsActions.BrandErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadBrandsList$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.LoadBrandsListAction>(BrandsActions.LOAD_BRANDS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpBrandService.getBrandsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new BrandsActions.LoadBrandsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new BrandsActions.BrandErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveBrand$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.SaveBrandAction>(BrandsActions.SAVE_BRAND),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpBrandService.saveBrand(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/brands/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new BrandsActions.SaveBrandSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new BrandsActions.BrandErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateBrand$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.UpdateBrandAction>(BrandsActions.UPDATE_BRAND),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpBrandService.updateBrand(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/brands/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new BrandsActions.UpdateBrandSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new BrandsActions.BrandErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteBrand$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.DeleteBrandAction>(BrandsActions.DELETE_BRAND),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpBrandService.deleteBrand(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new BrandsActions.DeleteBrandSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new BrandsActions.LoadBrandsAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new BrandsActions.BrandErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.ChangePaginationAction>(BrandsActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpBrandService.changePagination(pagination).pipe(
                map((response) => {
                    return new BrandsActions.LoadBrandsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.ChangeSearchValueAction>(BrandsActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpBrandService.changeSearchValue(value).pipe(
                map((response) => {
                    return new BrandsActions.LoadBrandsAction();
                })
            )
        )
    );

    @Effect()
    brandError$: Observable<Action> = this.actions$.pipe(
        ofType<BrandsActions.BrandErrorAction>(BrandsActions.BRAND_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
