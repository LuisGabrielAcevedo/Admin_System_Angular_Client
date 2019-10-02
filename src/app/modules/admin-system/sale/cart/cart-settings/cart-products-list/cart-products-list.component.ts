import { Component, OnInit, Input } from "@angular/core";
import Product from "src/app/models/admin-system/products";
import { IOrder } from "src/app/inferfaces/admin-system/order";

@Component({
  selector: "app-cart-products-list",
  templateUrl: "./cart-products-list.component.html",
  styleUrls: ["./cart-products-list.component.css"]
})
export class CartProductsListComponent implements OnInit {
  public title: string = "Products";
  @Input() public loading: boolean;
  @Input() public order: IOrder;
  products: any[] = [];
  constructor() {}

  ngOnInit() {
    Product.findRx().subscribe(resp => {
      this.products = resp.data;
      console.log(this.products);
    });
  }
}
