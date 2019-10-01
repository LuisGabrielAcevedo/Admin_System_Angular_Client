import { Component, OnInit } from "@angular/core";
import Customer from "src/app/models/admin-system/customers";
import { ELgxSortDirection } from "src/app/lgx-axios-dev-tools";
import {
  DynamicTableItem,
  DynamicTableHeader,
  DynamicTablePagination,
  DynamicTablePaginationDefault,
  DynamicTableChanges
} from "src/app/modules/shared-modules/table/table.interfaces";
import customerHeaders from "src/app/metadata/admin-system/table/customers";

@Component({
  selector: "app-cart-customers-list",
  templateUrl: "./cart-customers-list.component.html",
  styleUrls: ["./cart-customers-list.component.css"]
})
export class CartCustomersListComponent implements OnInit {
  public title: string = "Customers list";
  public headers: DynamicTableHeader[] = customerHeaders;
  public data: DynamicTableItem[] = [];
  public loading: boolean = false;
  public pagination: DynamicTablePagination = DynamicTablePaginationDefault;
  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.loading = true;
    Customer.page(this.pagination.currentPage)
      .perPage(this.pagination.itemsPerPage)
      .orderBy("updatedAt", ELgxSortDirection.DESC)
      .findRx()
      .subscribe(resp => {
        this.loading = false;
        this.pagination = {
          currentPage: resp.currentPage,
          itemsPerPage: resp.itemsPerPage,
          totalItems: resp.totalItems
        };
        this.data = resp.data;
      });
  }

  public dynamicTableChanges(changes: DynamicTableChanges) {
    if (changes.pagination) this.pagination = changes.pagination;
    this.loadData();
  }
}
