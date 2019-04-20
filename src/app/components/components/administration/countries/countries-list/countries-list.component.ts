import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountrySandbox } from '../../../../../sandbox/country.sandbox';
import { Subscription } from 'rxjs';
import {
  TableHeader,
  TableButtonAction,
  TablePagination, TablePaginationDefault, TableOutputItemData
} from 'src/app/components/sharedComponents/table/table.interfaces';
import { CountriesTableHeader, CountriesRowActions } from 'src/app/data/countriesTable';

import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = CountriesTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = CountriesRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private countrySandbox: CountrySandbox) { }

  ngOnInit() {
    this.loadCountries();
    this.subscriptions.push(
      this.countrySandbox.fetchCountries()
        .subscribe(countries => {
          this.data = countries;
          console.log(this.data);
        }),
      this.countrySandbox.fetchIsLoadingCountries()
        .subscribe(loading => {
          this.loading = loading;
          console.log(this.loading);
        }),
      this.countrySandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadCountries() {
    this.countrySandbox.loadCountries();
  }

  changePageAction(newPagination: TablePagination) {
    this.countrySandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.countrySandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.countrySandbox.deleteCountry(data.item);
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
