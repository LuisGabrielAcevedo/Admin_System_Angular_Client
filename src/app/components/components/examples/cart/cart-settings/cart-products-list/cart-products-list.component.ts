import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/inferfaces/product';

@Component({
  selector: 'app-cart-products-list',
  templateUrl: './cart-products-list.component.html',
  styleUrls: ['./cart-products-list.component.css']
})
export class CartProductsListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  productsList: IProduct[];
  loading = false;
  constructor() { }

  ngOnInit() {
  }
}
