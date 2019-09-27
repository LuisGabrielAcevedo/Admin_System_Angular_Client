import { Component, OnInit } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.css"]
})
export class CartListComponent implements OnInit {
  constructor(private cartSandBox: CartSandbox) {}

  ngOnInit() {}

  public payOrder() {
    console.log("aqui");
    this.cartSandBox.setTabActive(ECartTabActive.checkout);
  }
}
