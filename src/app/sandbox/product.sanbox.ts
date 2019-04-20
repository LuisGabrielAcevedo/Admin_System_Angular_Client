import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductsActions from '../store/product/product.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { IProduct } from '../inferfaces/product';


@Injectable()
export class ProductSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchProducts(): Observable<IProduct[]> {
        return this.store.select(fromRoot.getProducts);
    }
    fetchProductsList(): Observable<IProduct[]> {
        return this.store.select(fromRoot.getProductsList);
    }
    fetchIsLoadingProducts(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProducts);
    }
    fetchIsLoadingProduct(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProduct);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationProduct);
    }
    loadProducts(): void {
        this.store.dispatch(new ProductsActions.LoadProductsAction());
    }
    loadProductsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new ProductsActions.LoadProductsListAction(loadRequest));
    }
    saveProduct(product: IProduct): void {
        this.store.dispatch(new ProductsActions.SaveProductAction(product));
    }
    updateProduct(product: IProduct): void {
        this.store.dispatch(new ProductsActions.UpdateProductAction(product));
    }
    deleteProduct(product: IProduct): void {
        this.store.dispatch(new ProductsActions.DeleteProductAction(product));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new ProductsActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new ProductsActions.ChangeSearchValueAction(value));
    }
}
