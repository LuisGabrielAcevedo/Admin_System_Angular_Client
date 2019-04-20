import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as ProductCategories from './productCategory.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { ProductCategoryService } from '../../services/http/productCategory.service';

@Injectable()
export class ProductCategoryEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpProductCategoryService: ProductCategoryService
    ) { }

    @Effect()
    loadProductCategories$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.LoadProductCategoriesAction>(ProductCategories.LOAD_PRODUCT_CATEGORIES),
        switchMap((action) =>
            this.httpProductCategoryService.getProductCategories().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new ProductCategories.SetPaginationAction(pagination),
                        new ProductCategories.LoadProductCategoriesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductCategories.ProductCategoryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadProductCategoriesList$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.LoadProductCategoriesListAction>(ProductCategories.LOAD_PRODUCT_CATEGORIES_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpProductCategoryService.getProductCategoriesList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new ProductCategories.LoadProductCategoriesListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductCategories.ProductCategoryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveProductCategory$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.SaveProductCategoryAction>(ProductCategories.SAVE_PRODUCT_CATEGORY),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpProductCategoryService.saveProductCategory(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/product-categories/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductCategories.SaveProductCategorySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductCategories.ProductCategoryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateProductCategory$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.UpdateProductCategoryAction>(ProductCategories.UPDATE_PRODUCT_CATEGORY),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpProductCategoryService.updateProductCategory(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/product-categories/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductCategories.UpdateProductCategorySuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductCategories.ProductCategoryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteProductCategory$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.DeleteProductCategoryAction>(ProductCategories.DELETE_PRODUCT_CATEGORY),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpProductCategoryService.deleteProductCategory(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new ProductCategories.DeleteProductCategorySuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ProductCategories.LoadProductCategoriesAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new ProductCategories.ProductCategoryErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.ChangePaginationAction>(ProductCategories.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpProductCategoryService.changePagination(pagination).pipe(
                map((response) => {
                    return new ProductCategories.LoadProductCategoriesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.ChangeSearchValueAction>(ProductCategories.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpProductCategoryService.changeSearchValue(value).pipe(
                map((response) => {
                    return new ProductCategories.LoadProductCategoriesAction();
                })
            )
        )
    );

    @Effect()
    productCategoryError$: Observable<Action> = this.actions$.pipe(
        ofType<ProductCategories.ProductCategoryErrorAction>(ProductCategories.PRODUCT_CATEGORY_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
