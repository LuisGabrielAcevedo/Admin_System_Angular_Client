import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CountryActions from '../store/country/country.actions';
import * as fromRoot from '../store/index.store';
import { ICountry } from '../inferfaces/country';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';

@Injectable()
export class CountrySandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchCountries(): Observable<ICountry[]> {
        return this.store.select(fromRoot.getCountries);
    }
    fetchCountriesList(): Observable<ICountry[]> {
        return this.store.select(fromRoot.getCountriesList);
    }
    fetchIsLoadingCountries(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCountries);
    }
    fetchIsLoadingCountry(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingCountry);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationCountry);
    }
    loadCountries(): void {
        this.store.dispatch(new CountryActions.LoadCountriesAction());
    }
    loadCountriesList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new CountryActions.LoadCountriesListAction(loadRequest));
    }
    saveCountry(country: ICountry): void {
        this.store.dispatch(new CountryActions.SaveCountryAction(country));
    }
    updateCountry(country: ICountry): void {
        this.store.dispatch(new CountryActions.UpdateCountryAction(country));
    }
    deleteCountry(country: ICountry): void {
        this.store.dispatch(new CountryActions.DeleteCountryAction(country));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new CountryActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new CountryActions.ChangeSearchValueAction(value));
    }
}

