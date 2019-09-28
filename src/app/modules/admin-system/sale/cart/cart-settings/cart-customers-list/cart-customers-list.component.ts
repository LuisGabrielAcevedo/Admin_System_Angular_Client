import { Component, OnInit } from "@angular/core";
import Customer from "src/app/models/admin-system/customers";
import { SortDirection } from 'src/app/axioquent';
import { DynamicTableItem, DynamicTableHeader } from 'src/app/modules/shared-modules/table/table.interfaces';
import customerHeaders from 'src/app/metadata/admin-system/table/customers';

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
  constructor() {}

  ngOnInit() {
    this.loading = true;
    Customer.page(1)
    .perPage(10)
    .orderBy('updatedAt', SortDirection.DESC)
    .findRx().subscribe(resp => {
      this.loading = false;
      this.data = resp.data;
    });
  }
}
