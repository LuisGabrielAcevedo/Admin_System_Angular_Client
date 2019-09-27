import { Component, OnInit } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  public tabActive: ECartTabActive = ECartTabActive.productList;
  constructor(private cartSandBox: CartSandbox) {}

  ngOnInit() {
    this.cartSandBox.fetchTabActive().subscribe(tab => {
      this.tabActive = tab;
    });
  }
}
