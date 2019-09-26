import { Component, OnInit } from "@angular/core";
import Customer from "src/app/models/admin-system/customers";

@Component({
  selector: "app-cart-products-list",
  templateUrl: "./cart-products-list.component.html",
  styleUrls: ["./cart-products-list.component.css"]
})
export class CartProductsListComponent implements OnInit {
  products: any[] = [];
  constructor() {}

  ngOnInit() {
    Customer.findRx().subscribe(resp => {
      this.products = resp.data;
    });
  }
}
