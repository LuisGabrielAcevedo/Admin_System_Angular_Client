import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as Products from './product.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { ProductService } from '../../services/http/product.service';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpProductService: ProductService
    ) { }

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType<Products.LoadProductsAction>(Products.LOAD_PRODUCTS),
        switchMap((action) =>
            this.httpProductService.getProducts().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new Products.SetPaginationAction(pagination),
                        new Products.LoadProductsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new Products.ProductErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadProductsList$: Observable<Action> = this.actions$.pipe(
        ofType<Products.LoadProductsListAction>(Products.LOAD_PRODUCTS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpProductService.getProductsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new Products.LoadProductsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new Products.ProductErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveProduct$: Observable<Action> = this.actions$.pipe(
        ofType<Products.SaveProductAction>(Products.SAVE_PRODUCT),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpProductService.saveProduct(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/products/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new Products.SaveProductSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new Products.ProductErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<Products.UpdateProductAction>(Products.UPDATE_PRODUCT),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpProductService.updateProduct(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/product/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new Products.UpdateProductSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new Products.ProductErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<Products.DeleteProductAction>(Products.DELETE_PRODUCT),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpProductService.deleteProduct(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new Products.DeleteProductSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new Products.LoadProductsAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new Products.ProductErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<Products.ChangePaginationAction>(Products.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpProductService.changePagination(pagination).pipe(
                map((response) => {
                    return new Products.LoadProductsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<Products.ChangeSearchValueAction>(Products.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpProductService.changeSearchValue(value).pipe(
                map((response) => {
                    return new Products.LoadProductsAction();
                })
            )
        )
    );

    @Effect()
    productError$: Observable<Action> = this.actions$.pipe(
        ofType<Products.ProductErrorAction>(Products.PRODUCT_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
