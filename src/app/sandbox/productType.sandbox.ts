import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductTypesActions from '../store/productType/productType.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { IProductType } from '../inferfaces/productType';


@Injectable()
export class ProductTypeSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchProductTypes(): Observable<IProductType[]> {
        return this.store.select(fromRoot.getProductTypes);
    }
    fetchProductTypesList(): Observable<IProductType[]> {
        return this.store.select(fromRoot.getProductTypesList);
    }
    fetchIsLoadingProductTypes(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProductTypes);
    }
    fetchIsLoadingProductType(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingProductType);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationProductType);
    }
    loadProductTypes(): void {
        this.store.dispatch(new ProductTypesActions.LoadProductTypesAction());
    }
    loadProductTypesList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new ProductTypesActions.LoadProductTypesListAction(loadRequest));
    }
    saveProductType(productType: IProductType): void {
        this.store.dispatch(new ProductTypesActions.SaveProductTypeAction(productType));
    }
    updateProductType(productType: IProductType): void {
        this.store.dispatch(new ProductTypesActions.UpdateProductTypeAction(productType));
    }
    deleteProductType(productType: IProductType): void {
        this.store.dispatch(new ProductTypesActions.DeleteProductTypeAction(productType));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new ProductTypesActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new ProductTypesActions.ChangeSearchValueAction(value));
    }
}
