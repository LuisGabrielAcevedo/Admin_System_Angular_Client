import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/inferfaces/admin-system/order';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  public title: string = "Checkout";
  @Input() public loading: boolean;
  @Input() public order: IOrder;
  constructor() { }

  ngOnInit() {
  }

}
