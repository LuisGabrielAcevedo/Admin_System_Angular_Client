import { ICompany } from './../inferfaces/company';
import { IAdmin } from './../inferfaces/admin';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LicenseActions from '../store/license/license.actions';
import * as fromRoot from '../store/index.store';
import { ILicense } from 'src/app/inferfaces/license';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


@Injectable()
export class LicenseSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchLicenses(): Observable<ILicense[]> {
        return this.store.select(fromRoot.getLicenses);
    }
    fetchIsLoadingLicenses(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingLicenses);
    }
    fetchIsLoadingLicense(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingLicense);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationLicense);
    }
    loadLicenses(): void {
        this.store.dispatch(new LicenseActions.LoadLicensesAction());
    }
    saveLicense(license: ILicense): void {
        this.store.dispatch(new LicenseActions.SaveLicenseAction(license));
    }
    updateLicense(license: ILicense): void {
        this.store.dispatch(new LicenseActions.UpdateLicenseAction(license));
    }
    deleteLicense(license: ILicense): void {
        this.store.dispatch(new LicenseActions.DeleteLicenseAction(license));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new LicenseActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new LicenseActions.ChangeSearchValueAction(value));
    }
}

