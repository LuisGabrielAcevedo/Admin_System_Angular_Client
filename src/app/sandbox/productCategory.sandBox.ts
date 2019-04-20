import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductCategoriesActions from '../store/productCategory/productCategory.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { IProductCategory } from '../inferfaces/productCategory';


@Injectable()
export class ProductCategorySandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchProductCategories(): Observable<IProductCategory[]> {
        return this.store.select(fromRoot.getProductCategories);
    }
    fetchProductCategoriesList(): Observable<IProductCategory[]> {
        return this.store.select(fromRoot.getProductCategoriesList);
    }
    fetchIsLoadingProductCategories(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProductCategories);
    }
    fetchIsLoadingProductCategory(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProductCategory);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationProductCategory);
    }
    loadProductCategories(): void {
        this.store.dispatch(new ProductCategoriesActions.LoadProductCategoriesAction());
    }
    loadProductCategoriesList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new ProductCategoriesActions.LoadProductCategoriesListAction(loadRequest));
    }
    saveProductCategory(productCategory: IProductCategory): void {
        this.store.dispatch(new ProductCategoriesActions.SaveProductCategoryAction(productCategory));
    }
    updateProductCategory(productCategory: IProductCategory): void {
        this.store.dispatch(new ProductCategoriesActions.UpdateProductCategoryAction(productCategory));
    }
    deleteProductCategory(productCategory: IProductCategory): void {
        this.store.dispatch(new ProductCategoriesActions.DeleteProductCategoryAction(productCategory));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new ProductCategoriesActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new ProductCategoriesActions.ChangeSearchValueAction(value));
    }
}
