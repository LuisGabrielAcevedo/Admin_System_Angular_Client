import { ICompany } from './../inferfaces/company';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CompanyActions from '../store/company/company.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';


@Injectable()
export class CompanySandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchCompanies(): Observable<ICompany[]> {
        return this.store.select(fromRoot.getCompanies);
    }
    fetchCompaniesList(): Observable<ICompany[]> {
        return this.store.select(fromRoot.getCompaniesList);
    }
    fetchIsLoadingCompanies(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCompanies);
    }
    fetchIsLoadingCompany(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCompany);
    }
    loadCompanies(): void {
        this.store.dispatch(new CompanyActions.LoadCompaniesAction());
    }
    loadCompaniesList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new CompanyActions.LoadCompaniesListAction(loadRequest));
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationCompany);
    }
    saveCompany(company: ICompany): void {
        this.store.dispatch(new CompanyActions.SaveCompanyAction(company));
    }
    updateCompany(company: ICompany, file: File): void {
        this.store.dispatch(new CompanyActions.UpdateCompanyAction({ company: company, file: file }));
    }
    deleteCompany(company: ICompany): void {
        this.store.dispatch(new CompanyActions.DeleteCompanyAction(company));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new CompanyActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new CompanyActions.ChangeSearchValueAction(value));
    }
}


