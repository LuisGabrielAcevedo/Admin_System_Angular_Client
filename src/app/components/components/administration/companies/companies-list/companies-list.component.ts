import { CompanySandbox } from 'src/app/sandbox/company.sandbox';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompaniesTableHeader } from 'src/app/data/companiesTable';
import {TableHeader,
  TableButtonAction, TablePagination, TablePaginationDefault
} from 'src/app/components/sharedComponents/table/table.interfaces';
import { CompanyService } from 'src/app/services/http/company.service';
import { IApiResponse } from 'src/app/inferfaces/loadRequest';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';

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
    private companyService: CompanyService,
    private snackBarSandbox: SnackbarSandbox
    ) { }

  ngOnInit() {
    this.rowActions = this.companyService.getRowActions();
    this.loadCompanies();
  }

  loadCompanies() {
    this.loading= true;
    this.companyService.getCompanies().subscribe(resp => this.setData(resp));
  }

  setData(resp: IApiResponse) {
    this.data = resp.data;
    this.pagination = {
      currentPage: resp.currentPage,
      totalItems: resp.totalItems,
      itemsPerPage: resp.itemsPerPage
    }
    this.loading = false;
  }

  changePageAction(newPagination: TablePagination) {
    this.companyService.changePagination(newPagination);
    this.loadCompanies();
  }

  search(value: string) {
    this.companyService.changeSearchValue(value);
    this.loadCompanies();
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.companyService.deleteCompany(data.item).subscribe(
        resp => {
          this.snackBarSandbox.sendMessage({action: '', message: resp.msg});
          this.loadCompanies();
        },
        error => console.log(error)
      );;
    }
  }

  ngOnDestroy() {}
}
