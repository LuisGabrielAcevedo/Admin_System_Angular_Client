import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as ProductTypes from './productType.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { ProductTypeService } from '../../services/http/productType.service';

@Injectable()
export class ProductTypeEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpProductTypeService: ProductTypeService
    ) { }

    @Effect()
    loadProductTypes$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.LoadProductTypesAction>(ProductTypes.LOAD_PRODUCT_TYPES),
        switchMap((action) =>
            this.httpProductTypeService.getProductTypes().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new ProductTypes.SetPaginationAction(pagination),
                        new ProductTypes.LoadProductTypesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductTypes.ProductTypeErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadProductTypesList$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.LoadProductTypesListAction>(ProductTypes.LOAD_PRODUCT_TYPES_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpProductTypeService.getProductTypesList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new ProductTypes.LoadProductTypesListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductTypes.ProductTypeErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveProductType$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.SaveProductTypeAction>(ProductTypes.SAVE_PRODUCT_TYPE),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpProductTypeService.saveProductType(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/product-types/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductTypes.SaveProductTypeSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductTypes.ProductTypeErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateProductType$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.UpdateProductTypeAction>(ProductTypes.UPDATE_PRODUCT_TYPE),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpProductTypeService.updateProductType(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/product-types/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductTypes.UpdateProductTypeSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductTypes.ProductTypeErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteProductType$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.DeleteProductTypeAction>(ProductTypes.DELETE_PRODUCT_TYPE),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpProductTypeService.deleteProductType(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new ProductTypes.DeleteProductTypeSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductTypes.LoadProductTypesAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductTypes.ProductTypeErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.ChangePaginationAction>(ProductTypes.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpProductTypeService.changePagination(pagination).pipe(
                map((response) => {
                    return new ProductTypes.LoadProductTypesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.ChangeSearchValueAction>(ProductTypes.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpProductTypeService.changeSearchValue(value).pipe(
                map((response) => {
                    return new ProductTypes.LoadProductTypesAction();
                })
            )
        )
    );

    @Effect()
    productTypeError$: Observable<Action> = this.actions$.pipe(
        ofType<ProductTypes.ProductTypeErrorAction>(ProductTypes.PRODUCT_TYPE_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
