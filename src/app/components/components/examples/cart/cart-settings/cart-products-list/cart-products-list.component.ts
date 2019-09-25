import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart-products-list",
  templateUrl: "./cart-products-list.component.html",
  styleUrls: ["./cart-products-list.component.css"]
})
export class CartProductsListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  productsList: any[];
  loading = false;
  constructor() {}

  ngOnInit() {}
}
