import { Component, OnInit } from "@angular/core";
import Customer from "src/app/models/admin-system/customers";

@Component({
  selector: "app-cart-customers-list",
  templateUrl: "./cart-customers-list.component.html",
  styleUrls: ["./cart-customers-list.component.css"]
})
export class CartCustomersListComponent implements OnInit {
  customers: any[] = [];
  constructor() {}

  ngOnInit() {
    Customer.findRx().subscribe(resp => {
      this.customers = resp.data;
    });
  }
}
