import { LicenseSandbox } from './../../../../../sandbox/license.sandbox';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LicensesTableHeader, LicensesRowActions } from 'src/app/data/licensesTable';
import { TableHeader,
   TableButtonAction, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-licenses-list',
  templateUrl: './licenses-list.component.html',
  styleUrls: ['./licenses-list.component.css']
})
export class LicensesListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = LicensesTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = LicensesRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private licenseSandbox: LicenseSandbox) { }

  ngOnInit() {
    this.loadLicenses();
    this.subscriptions.push(
      this.licenseSandbox.fetchLicenses()
      .subscribe(licenses => {
        this.data = licenses;
        console.log(this.data);
      }),
      this.licenseSandbox.fetchIsLoadingLicenses()
      .subscribe(loading => {
        this.loading = loading;
        console.log(this.loading);
      }),
      this.licenseSandbox.fetchPagination()
      .pipe(filter(pagination => pagination !== null))
      .subscribe(pagination => {
        this.pagination = pagination;
      })
    );
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.licenseSandbox.deleteLicense(data.item);
    }
  }

  loadLicenses() {
    this.licenseSandbox.loadLicenses();
  }
  changePageAction(newPagination: TablePagination) {
    this.licenseSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.licenseSandbox.changeSearchValue(value);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
