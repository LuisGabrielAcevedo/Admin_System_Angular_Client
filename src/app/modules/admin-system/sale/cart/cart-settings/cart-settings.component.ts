import { Component, OnInit, Input } from "@angular/core";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";

@Component({
  selector: "app-cart-settings",
  templateUrl: "./cart-settings.component.html",
  styleUrls: ["./cart-settings.component.css"]
})
export class CartSettingsComponent implements OnInit {
  public items: CartTabsInterface[] = [
    { icon: "view_module", value: ECartTabActive.productList },
    { icon: "favorite", value: ECartTabActive.favoriteProductList },
    { icon: "people", value: ECartTabActive.customersList },
    { icon: "local_atm", value: ECartTabActive.checkout }
  ];
  @Input() public tabActive: ECartTabActive;
  @Input() public company: any;
  constructor(private cartSandBox: CartSandbox) {}

  ngOnInit() {
    console.log(this.tabActive)
  }

  changeValue(tab: ECartTabActive) {
    this.cartSandBox.setTabActive(tab);
  }

  style(tab: ECartTabActive) {
    return {
      background: `${this.tabActive === tab ? "#304ffe" : ""}`,
      color: `${
        this.tabActive !== tab ? "#304ffe !important" : "white !important"
      }`,
      cursor: "pointer"
    };
  }
}

export interface CartTabsInterface {
  icon: string;
  value: ECartTabActive;
}
