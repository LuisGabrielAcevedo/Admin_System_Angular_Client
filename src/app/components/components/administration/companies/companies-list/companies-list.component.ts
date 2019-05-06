import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompaniesTableHeader } from 'src/app/data/companiesTable';
import {TableHeader,
  TableButtonAction, TablePagination, TablePaginationDefault
} from 'src/app/components/sharedComponents/table/table.interfaces';
import { filter } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/http/company.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = CompaniesTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = [];
  pagination: TablePagination = TablePaginationDefault;
  constructor(
    private companySandbox: CompanySandbox,
    private companyService: CompanyService
    ) { }

  ngOnInit() {
    this.rowActions = this.companyService.getRowActions();
    this.loadCompanies();
    this.subscriptions.push(
      this.companySandbox.fetchCompanies()
        .subscribe(companies => {
          this.data = companies;
        }),
      this.companySandbox.fetchIsLoadingCompanies()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.companySandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadCompanies() {
    this.companySandbox.loadCompanies();
  }

  changePageAction(newPagination: TablePagination) {
    this.companySandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.companySandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.companySandbox.deleteCompany(data.item);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
