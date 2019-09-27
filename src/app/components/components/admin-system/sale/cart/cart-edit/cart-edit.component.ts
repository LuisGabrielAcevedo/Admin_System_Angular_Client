import { Component, OnInit } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";

@Component({
  selector: "app-cart-edit",
  templateUrl: "./cart-edit.component.html",
  styleUrls: ["./cart-edit.component.css"]
})
export class CartEditComponent implements OnInit {
  constructor(private cartSandBox: CartSandbox) {}
  ngOnInit() {}
}
