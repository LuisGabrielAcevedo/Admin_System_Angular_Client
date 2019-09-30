import { Component, OnInit } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";

@Component({
  selector: "app-cart-favorite-products-list",
  templateUrl: "./cart-favorite-products-list.component.html",
  styleUrls: ["./cart-favorite-products-list.component.css"]
})
export class CartFavoriteProductsListComponent implements OnInit {
  public title: string = "Favorite products";
  constructor(private cartSandbox: CartSandbox) {}

  ngOnInit() {}
}
