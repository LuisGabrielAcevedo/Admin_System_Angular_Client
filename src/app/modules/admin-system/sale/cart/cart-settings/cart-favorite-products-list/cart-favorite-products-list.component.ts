import { Component, OnInit, Input } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";

@Component({
  selector: "app-cart-favorite-products-list",
  templateUrl: "./cart-favorite-products-list.component.html",
  styleUrls: ["./cart-favorite-products-list.component.css"]
})
export class CartFavoriteProductsListComponent implements OnInit {
  public title: string = "Favorite products";
  public categories: any[] = [];
  public types: any[] = [];
  public brands: any[] = [];
  @Input() public company: any;
  constructor(private cartSandbox: CartSandbox) {}

  ngOnInit() {}
}
