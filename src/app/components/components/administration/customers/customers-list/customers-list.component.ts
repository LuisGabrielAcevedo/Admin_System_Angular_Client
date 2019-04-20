import { CustomerSandbox } from './../../../../../sandbox/customer.sandbox';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableHeader,
   TableButtonAction, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { AdminsTableHeader } from 'src/app/data/adminsTable';
import { CustomersRowActions } from 'src/app/data/customersTable';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = AdminsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = CustomersRowActions;
  pagination: TablePagination = TablePaginationDefault;

  constructor(private customerSandbox: CustomerSandbox) { }

  ngOnInit() {
    this.loadCustomers();
      this.subscriptions.push(
      this.customerSandbox.fetchCustomers()
      .subscribe(customers => {
        this.data = customers;
      }),
      this.customerSandbox.fetchIsLoadingCustomers()
      .subscribe(loading => {
        this.loading = loading;
      }),
      this.customerSandbox.fetchPagination()
      .pipe(filter(pagination => pagination !== null))
      .subscribe(pagination => {
        this.pagination = pagination;
      })
    );
  }

  loadCustomers() {
    this.customerSandbox.loadCustomers();
  }

  changePageAction(newPagination: TablePagination) {
    this.customerSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.customerSandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.customerSandbox.deleteCustomer(data.item);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
