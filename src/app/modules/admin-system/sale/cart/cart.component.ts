import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartSandbox } from "src/app/store/cart/cart.sandbox";
import { ECartTabActive, IOrder } from "src/app/inferfaces/admin-system/order";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public tabActive: ECartTabActive = ECartTabActive.productList;
  public loading: boolean = false;
  public company: any;
  public order: IOrder;
  constructor(private cartSandBox: CartSandbox) {}

  ngOnInit() {
    this.subscriptions.push(
      this.cartSandBox.fetchTabActive().subscribe(tab => {
        this.tabActive = tab;
      }),
      this.cartSandBox.fetchCompany().subscribe(company => {
        this.company = company;
      }),
      this.cartSandBox.fetchLoading().subscribe(loading => {
        this.loading = loading;
      }),
      this.cartSandBox.fetchOrder().subscribe(order => {
        this.order = order;
      })
    )
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
