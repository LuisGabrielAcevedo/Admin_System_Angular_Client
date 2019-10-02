import { Component, OnInit, Input } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";
import { ECartTabActive, IOrder } from "src/app/inferfaces/admin-system/order";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.css"]
})
export class CartListComponent implements OnInit {
  @Input() public loading: boolean;
  @Input() public order: IOrder;
  constructor(private cartSandBox: CartSandbox) {}

  ngOnInit() {}

  public payOrder() {
    this.cartSandBox.setTabActive(ECartTabActive.checkout);
  }
}
