import { Component, OnInit } from "@angular/core";
import Product from "src/app/models/admin-system/products";

@Component({
  selector: "app-cart-products-list",
  templateUrl: "./cart-products-list.component.html",
  styleUrls: ["./cart-products-list.component.css"]
})
export class CartProductsListComponent implements OnInit {
  public title: string = "Products"
  products: any[] = [];
  constructor() {}

  ngOnInit() {
    Product.findRx().subscribe(resp => {
      this.products = resp.data;
      console.log(this.products);
    });
  }
}
