import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductSandbox } from 'src/app/sandbox/product.sanbox';
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
  constructor( private productSandbox: ProductSandbox ) { }

  ngOnInit() {
    this.loadProducts();
    this.subscriptions.push(
      this.productSandbox.fetchProducts()
        .subscribe(products => {
          this.productsList = products;
        }),
      this.productSandbox.fetchIsLoadingProducts()
        .subscribe(loading => {
          this.loading = loading;
        })
    );
  }

  loadProducts() {
    this.productSandbox.loadProducts();
  }
}
