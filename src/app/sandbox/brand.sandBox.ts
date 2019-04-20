import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BrandsActions from '../store/brand/brand.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';
import { IBrand } from '../inferfaces/brand';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';


@Injectable()
export class BrandSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchBrands(): Observable<IBrand[]> {
        return this.store.select(fromRoot.getBrands);
    }
    fetchBrandsList(): Observable<IBrand[]> {
        return this.store.select(fromRoot.getBrandsList);
    }
    fetchIsLoadingBrands(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingBrands);
    }
    fetchIsLoadingBrand(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingBrand);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationBrand);
    }
    loadBrands(): void {
        this.store.dispatch(new BrandsActions.LoadBrandsAction());
    }
    loadBrandsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new BrandsActions.LoadBrandsListAction(loadRequest));
    }
    saveBrand(brand: IBrand): void {
        this.store.dispatch(new BrandsActions.SaveBrandAction(brand));
    }
    updateBrand(brand: IBrand): void {
        this.store.dispatch(new BrandsActions.UpdateBrandAction(brand));
    }
    deleteBrand(brand: IBrand): void {
        this.store.dispatch(new BrandsActions.DeleteBrandAction(brand));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new BrandsActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new BrandsActions.ChangeSearchValueAction(value));
    }
}
