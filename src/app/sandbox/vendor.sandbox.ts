import { IVendor } from 'src/app/inferfaces/vendor';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../store/index.store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as VendorActions from '../store/vendor/vendor.actions';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';



@Injectable()
export class VendorSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchVendors(): Observable<IVendor[]> {
        return this.store.select(fromRoot.getVendors);
    }
    fetchVendorsList(): Observable<IVendor[]> {
        return this.store.select(fromRoot.getVendorsList);
    }
    fetchIsLoadingVendors(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingVendors);
    }

    fetchIsLoadingVendor(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingVendor);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationVendor);
    }

    loadVendors(): void {
        this.store.dispatch(new VendorActions.LoadVendorsAction());
    }

    loadVendorsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new VendorActions.LoadVendorsListAction(loadRequest));
    }

    saveVendor(vendor: IVendor): void {
        this.store.dispatch(new VendorActions.SaveVendorAction(vendor));
    }

    updateVendor(vendor: IVendor): void {
        this.store.dispatch(new VendorActions.UpdateVendorAction(vendor));
    }

    deleteVendor(vendor: IVendor): void {
        this.store.dispatch(new VendorActions.DeleteVendorAction(vendor));
    }

    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new VendorActions.ChangePaginationAction(pagination));
    }

    changeSearchValue(value: string): void {
        this.store.dispatch(new VendorActions.ChangeSearchValueAction(value));
    }
}
